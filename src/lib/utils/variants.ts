/**
 * A tiny, dependency-free variant resolver. Define a base class string and a
 * map of variant groups, then call it with the chosen options to get classes.
 *
 *   const button = defineVariants({
 *     base: "inline-flex items-center justify-center",
 *     variants: { tone: { solid: "...", outline: "..." }, size: { sm: "...", md: "..." } },
 *     defaults: { tone: "solid", size: "md" },
 *   })
 *   button({ tone: "outline" }) // -> base + outline + md
 */
export function defineVariants<
  V extends Record<string, Record<string, string>>,
>(config: {
  base?: string
  variants: V
  defaults?: { [K in keyof V]?: keyof V[K] }
}) {
  return (options?: { [K in keyof V]?: keyof V[K] }) => {
    const chosen = {
      ...config.defaults,
      ...options,
    } as Record<string, string | undefined>
    const classes: string[] = [config.base ?? ""]
    for (const key of Object.keys(config.variants)) {
      const value = chosen[key]
      const group = config.variants[key] as Record<string, string>
      if (value != null && group[value]) classes.push(group[value])
    }
    return classes.filter(Boolean).join(" ")
  }
}