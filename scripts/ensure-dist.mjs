// The docs pages self-import "@fractaldesign/negentropy-ui/*", which resolves
// through package.json exports -> dist/. dist/ is gitignored, so a fresh clone
// can't start the dev server without building it first.
import { existsSync } from "node:fs"
import { spawnSync } from "node:child_process"

if (!existsSync("dist")) {
	console.log("dist/ missing — building the package first (pnpm package)...")
	const { status } = spawnSync("pnpm", ["package"], { stdio: "inherit" })
	if (status !== 0) process.exit(status ?? 1)
}
