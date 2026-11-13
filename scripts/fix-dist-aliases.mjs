// svelte-package copies .svelte sources verbatim, so `$lib/...` imports
// survive into dist. `$lib` maps to src/lib, which is the dist root, so each
// occurrence becomes the relative path from that file back to the dist root.
// Run after svelte-package via `pnpm package`.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs"
import { join, dirname, relative } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const dist = join(root, "dist")

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) yield* walk(full)
    else yield full
  }
}

let touched = 0
for (const file of walk(dist)) {
  const contents = readFileSync(file, "utf8")
  if (!contents.includes("$lib")) continue
  let prefix = relative(dirname(file), dist)
  prefix = (prefix === "" ? "." : prefix) + "/"
  const fixed = contents.replaceAll("$lib/", prefix).replaceAll("$lib", prefix)
  writeFileSync(file, fixed)
  touched++
}

const leftover = [...walk(dist)].filter((f) =>
  readFileSync(f, "utf8").includes("$lib"),
)
if (leftover.length) {
  console.error("fix-dist-aliases: $lib still present in", leftover)
  process.exit(1)
}
console.log(`fix-dist-aliases: rewrote $lib in ${touched} files`)