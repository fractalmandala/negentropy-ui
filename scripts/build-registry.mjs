// Scans src/lib/components/*/meta.json and writes src/lib/registry.json.
// The registry is the single source of truth for the sidebar, the home page
// and the validator. Per-component meta.json files keep parallel work
// conflict-free: no agent ever edits a shared registry by hand.
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const componentsDir = join(root, "src/lib/components")

export const CATEGORY_ORDER = [
  "General",
  "Forms",
  "Date & Time",
  "Data Display",
  "Feedback",
  "Overlay",
  "Navigation",
  "Layout",
  "Media",
]

const entries = []
if (existsSync(componentsDir)) {
  for (const slug of readdirSync(componentsDir)) {
    const metaPath = join(componentsDir, slug, "meta.json")
    if (!existsSync(metaPath)) continue
    const meta = JSON.parse(readFileSync(metaPath, "utf8"))
    entries.push({ ...meta, slug })
  }
}

entries.sort((a, b) => {
  const ca = CATEGORY_ORDER.indexOf(a.category)
  const cb = CATEGORY_ORDER.indexOf(b.category)
  if (ca !== cb) return (ca === -1 ? 99 : ca) - (cb === -1 ? 99 : cb)
  return a.name.localeCompare(b.name)
})

const registry = {
  generated: true,
  count: entries.length,
  categories: CATEGORY_ORDER.filter((c) => entries.some((e) => e.category === c)),
  components: entries,
}

writeFileSync(
  join(root, "src/lib/registry.json"),
  JSON.stringify(registry, null, 2) + "\n",
)
console.log(`registry: ${entries.length} components -> src/lib/registry.json`)