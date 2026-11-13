// Deterministic proof gate. A component is only "done" when its library code
// AND its documentation page both exist and satisfy the contract. This script
// checks structure and required doc sections; `smoke.mjs` proves the pages
// actually render. Exit code is non-zero on any failure.
//
//   node scripts/validate.mjs            # validate every component
//   node scripts/validate.mjs button tabs # validate a subset
import { readdirSync, readFileSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const componentsDir = join(root, "src/lib/components")
const routesDir = join(root, "src/routes/docs")

const REQUIRED_SECTIONS = [
  "installation",
  "usage",
  "demos",
  "variants",
  "api",
  "accessibility",
]
const MIN_DEMOS = 3
const REQUIRED_META = ["name", "slug", "description", "category", "parts", "entry"]
// `placeholder` is a real HTML/ui-sdk prop, so ban only lazy filler phrases,
// not the attribute name itself.
const BANNED = [
  /\bTODO\b/,
  /\bFIXME\b/,
  /placeholder (text|content|here|copy)/i,
  /as a placeholder/i,
  /insert placeholder/i,
  /lorem ipsum/i,
  /coming soon/i,
]

// Library-level guides are held to the same "real sections, no filler" contract.
const GUIDES = [
  { slug: "docs-index", file: join(routesDir, "+page.svelte"), sections: ["overview", "guides", "catalog"] },
  { slug: "getting-started", file: join(routesDir, "getting-started", "+page.svelte"), sections: ["overview", "requirements", "installation", "first-component", "next-steps"] },
  { slug: "theming", file: join(routesDir, "theming", "+page.svelte"), sections: ["overview", "tokens", "themes", "customization"] },
  { slug: "patterns", file: join(routesDir, "patterns", "+page.svelte"), sections: ["overview", "parts", "styling", "snippets", "controlled", "state"] },
]

const only = process.argv.slice(2)
const slugs = existsSync(componentsDir)
  ? readdirSync(componentsDir).filter((s) => existsSync(join(componentsDir, s, "meta.json")))
  : []
const targets = only.length ? slugs.filter((s) => only.includes(s)) : slugs

const errors = []
const fail = (slug, msg) => errors.push(`[${slug}] ${msg}`)

if (only.length) {
  for (const s of only) if (!slugs.includes(s)) fail(s, "no meta.json found (unknown component)")
}

for (const slug of targets) {
  const dir = join(componentsDir, slug)
  const meta = JSON.parse(readFileSync(join(dir, "meta.json"), "utf8"))

  for (const key of REQUIRED_META) {
    if (meta[key] == null || meta[key] === "") fail(slug, `meta.json missing "${key}"`)
  }
  if (!Array.isArray(meta.parts) || meta.parts.length === 0) {
    fail(slug, "meta.json parts must be a non-empty array")
  }

  if (!existsSync(join(dir, "index.ts"))) fail(slug, "missing index.ts barrel export")

  const pagePath = join(routesDir, slug, "+page.svelte")
  if (!existsSync(pagePath)) {
    fail(slug, "missing docs page src/routes/docs/" + slug + "/+page.svelte")
    continue
  }
  const page = readFileSync(pagePath, "utf8")

  // Pages write <Section id="installation">; Section renders data-section at
  // runtime (smoke.mjs checks that). Here we match the source prop, or a
  // literal data-section attribute if a page uses one directly.
  for (const section of REQUIRED_SECTIONS) {
    const hasSection =
      page.includes(`id="${section}"`) || page.includes(`data-section="${section}"`)
    if (!hasSection) {
      fail(slug, `docs page missing required section "${section}" (<Section id="${section}">)`)
    }
  }

  const demos = (page.match(/data-demo\b/g) || []).length
  // <Demo> renders data-demo at runtime; in source we count <Demo usages.
  const demoTags = (page.match(/<Demo[\s>]/g) || []).length
  if (demoTags < MIN_DEMOS) {
    fail(slug, `docs page has ${demoTags} <Demo> blocks, needs >= ${MIN_DEMOS}`)
  }

  for (const re of BANNED) {
    if (re.test(page)) fail(slug, `docs page contains banned marker ${re}`)
  }

  if (!page.includes("$lib/components/" + slug) && !page.includes("$lib/components")) {
    fail(slug, "docs page does not import the component from $lib/components")
  }
}

if (!only.length) {
  for (const g of GUIDES) {
    if (!existsSync(g.file)) {
      fail(g.slug, "missing guide page " + g.file)
      continue
    }
    const page = readFileSync(g.file, "utf8")
    for (const section of g.sections) {
      const hasSection =
        page.includes(`id="${section}"`) || page.includes(`data-section="${section}"`)
      if (!hasSection) fail(g.slug, `guide missing required section "${section}"`)
    }
    for (const re of BANNED) {
      if (re.test(page)) fail(g.slug, `guide contains banned marker ${re}`)
    }
  }
}

if (errors.length) {
  console.error(`VALIDATION FAILED (${errors.length} problem(s)):\n`)
  for (const e of errors) console.error("  - " + e)
  process.exit(1)
}
const guideCount = only.length ? 0 : GUIDES.length
console.log(`validation passed: ${targets.length} component(s) + ${guideCount} guide(s), each with code + complete docs.`)