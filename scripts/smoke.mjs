// Runtime proof: build must already exist (run `pnpm build` first). Boots
// `vite preview`, fetches every /docs/<slug> route, and asserts the page
// returns 200 and actually contains the rendered documentation markers and
// live ui-sdk demo markup (data-slot). This is the "documentation is proof"
// gate that structure checks alone cannot give.
import { spawn } from "node:child_process"
import { readFileSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const registryPath = join(root, "src/lib/registry.json")
if (!existsSync(registryPath)) {
  console.error("smoke: run `pnpm registry` first")
  process.exit(1)
}
const registry = JSON.parse(readFileSync(registryPath, "utf8"))
const port = 4173 + Math.floor(Math.random() * 500)
const base = `http://localhost:${port}`

const server = spawn("pnpm", ["exec", "vite", "preview", "--port", String(port), "--strictPort"], {
  cwd: root,
  stdio: ["ignore", "pipe", "pipe"],
})

let ready = false
server.stdout.on("data", (d) => {
  if (String(d).includes("Local") || String(d).includes(String(port))) ready = true
})
server.stderr.on("data", (d) => process.stderr.write(d))

async function waitFor(maxMs = 30000) {
  const start = Date.now()
  while (Date.now() - start < maxMs) {
    try {
      const res = await fetch(base + "/")
      if (res.ok) return true
    } catch {}
    await new Promise((r) => setTimeout(r, 300))
  }
  return false
}

const REQUIRED = ["installation", "usage", "demos", "variants", "api", "accessibility"]
const GUIDES = [
  { path: "/docs", sections: ["overview", "guides", "catalog"] },
  { path: "/docs/getting-started", sections: ["overview", "requirements", "installation", "first-component", "next-steps"] },
  { path: "/docs/theming", sections: ["overview", "tokens", "themes", "customization"] },
  { path: "/docs/patterns", sections: ["overview", "parts", "styling", "snippets", "controlled", "state"] },
]
const failures = []

async function check(slug) {
  const url = `${base}/docs/${slug}`
  let res
  try {
    res = await fetch(url)
  } catch (e) {
    failures.push(`${slug}: fetch failed (${e.message})`)
    return
  }
  if (!res.ok) {
    failures.push(`${slug}: HTTP ${res.status}`)
    return
  }
  const html = await res.text()
  for (const section of REQUIRED) {
    if (!html.includes(`data-section="${section}"`)) {
      failures.push(`${slug}: rendered page missing section "${section}"`)
    }
  }
  if (!html.includes("data-demo")) failures.push(`${slug}: no rendered demo`)
  if (!html.includes("data-slot")) failures.push(`${slug}: no ui-sdk markup (data-slot) rendered`)
}

async function checkGuide(g) {
  const url = base + g.path
  let res
  try {
    res = await fetch(url)
  } catch (e) {
    failures.push(`${g.path}: fetch failed (${e.message})`)
    return
  }
  if (!res.ok) {
    failures.push(`${g.path}: HTTP ${res.status}`)
    return
  }
  const html = await res.text()
  for (const section of g.sections) {
    if (!html.includes(`data-section="${section}"`)) {
      failures.push(`${g.path}: rendered page missing section "${section}"`)
    }
  }
  if (!html.includes("data-demo")) failures.push(`${g.path}: no rendered demo`)
  if (!html.includes("data-slot")) failures.push(`${g.path}: no ui-sdk markup (data-slot) rendered`)
}

const up = await waitFor()
if (!up) {
  console.error("smoke: preview server did not start")
  server.kill("SIGTERM")
  process.exit(1)
}

for (const c of registry.components) await check(c.slug)
for (const g of GUIDES) await checkGuide(g)

// The home page must render and list components.
try {
  const res = await fetch(base + "/")
  const html = await res.text()
  if (!res.ok) failures.push(`home: HTTP ${res.status}`)
  else if (!html.includes("Negentropy")) failures.push("home: missing brand markup")
} catch (e) {
  failures.push(`home: fetch failed (${e.message})`)
}

server.kill("SIGTERM")

if (failures.length) {
  console.error(`SMOKE FAILED (${failures.length}):\n`)
  for (const f of failures) console.error("  - " + f)
  process.exit(1)
}
console.log(`smoke passed: ${registry.components.length} component pages + ${GUIDES.length} guides render with demos + ui-sdk markup.`)