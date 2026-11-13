export { default as Tabs } from "./tabs.svelte"
export { default as TabsList } from "./tabs-list.svelte"
export { default as TabsTab } from "./tabs-tab.svelte"
export { default as TabsPanel } from "./tabs-panel.svelte"
export { default as TabsIndicator } from "./tabs-indicator.svelte"
export { default as TabsTabIcon } from "./tabs-tab-icon.svelte"
export { createTabsController } from "@ui-sdk/svelte/tabs"
export type {
  TabsController,
  TabsOptions,
  TabsState,
  TabsValueChangeReason,
} from "@ui-sdk/svelte/tabs"