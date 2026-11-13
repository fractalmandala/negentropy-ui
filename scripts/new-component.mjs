// Scaffolds a new component from the canonical templates so every component
// starts from the same shape. Agents usually write files directly, but this
// keeps the structure deterministic and is the reference for the contract.
//
//   node scripts/new-component.mjs <slug> "<Name>" "<Category>" "<entry>"
import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const [slug, name, category = "General", entry = ""] = process.argv.slice(2)
if (!slug || !name) {
  console.error('usage: node scripts/new-component.mjs <slug> "<Name>" "<Category>" "<entry>"')
  process.exit(1)
}

const dir = join(root, "src/lib/components", slug)
const routeDir = join(root, "src/routes/docs", slug)
if (existsSync(join(dir, "meta.json"))) {
  console.error(`${slug}: already exists`)
  process.exit(1)
}
mkdirSync(dir, { recursive: true })
mkdirSync(routeDir, { recursive: true })

const meta = {
  name,
  slug,
  description: `${name} component.`,
  category,
  status: "stable",
  entry: entry || `@ui-sdk/svelte/${slug}`,
  parts: [name],
}
writeFileSync(join(dir, "meta.json"), JSON.stringify(meta, null, 2) + "\n")
writeFileSync(
  join(dir, "index.ts"),
  `// export { default as ${name} } from "./${slug}.svelte"\nexport {}\n`,
)

const tpl = readFileSync(join(root, "templates/docs-page.svelte"), "utf8")
writeFileSync(
  join(routeDir, "+page.svelte"),
  tpl.replaceAll("__NAME__", name).replaceAll("__SLUG__", slug).replaceAll("__CATEGORY__", category),
)
console.log(`scaffolded ${slug} (lib + docs). Fill in the wrapper and the docs page.`)