<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "$lib/docs"
  import {
    Pagination,
    PaginationList,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationFirst,
    PaginationLast,
    PaginationEllipsis,
  } from "$lib/components/pagination"
  import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Ellipsis } from "@lucide/svelte"

  const installCode = `import {
  Pagination,
  PaginationList,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis,
} from "$lib/components/pagination"`

  const usageCode = `<script lang="ts">
  import { ChevronLeft, ChevronRight, Ellipsis } from "@lucide/svelte"
  import {
    Pagination,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationList,
    PaginationNext,
    PaginationPrevious,
  } from "$lib/components/pagination"
<\/script>

<Pagination aria-label="Pagination" pageCount={10}>
  <PaginationList>
    {#snippet children(state)}
      <PaginationItem>
        <PaginationPrevious>
          <ChevronLeft aria-hidden="true" />
          <span class="sr-only">Previous</span>
        </PaginationPrevious>
      </PaginationItem>
      {#each state.items as item (item)}
        <PaginationItem>
          {#if typeof item === "number"}
            <PaginationLink page={item} />
          {:else}
            <PaginationEllipsis><Ellipsis aria-hidden="true" /></PaginationEllipsis>
          {/if}
        </PaginationItem>
      {/each}
      <PaginationItem>
        <PaginationNext>
          <span class="sr-only">Next</span>
          <ChevronRight aria-hidden="true" />
        </PaginationNext>
      </PaginationItem>
    {/snippet}
  </PaginationList>
</Pagination>`

  const controlledCode = `<script lang="ts">
  import {
    Pagination,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationList,
    PaginationNext,
    PaginationPrevious,
  } from "$lib/components/pagination"

  let page = $state(1)
  const total = 95
  const pageSize = 20
<\/script>

<div class="space-y-3">
  <p class="text-sm text-muted">
    Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total}
  </p>
  <Pagination bind:page aria-label="Pagination" {total} {pageSize}>
    <PaginationList>
      {#snippet children(state)}
        <PaginationItem>
          <PaginationPrevious>Previous</PaginationPrevious>
        </PaginationItem>
        {#each state.items as item (item)}
          <PaginationItem>
            {#if typeof item === "number"}
              <PaginationLink page={item} />
            {:else}
              <PaginationEllipsis />
            {/if}
          </PaginationItem>
        {/each}
        <PaginationItem>
          <PaginationNext>Next</PaginationNext>
        </PaginationItem>
      {/snippet}
    </PaginationList>
  </Pagination>
</div>`

  const firstLastCode = `<script lang="ts">
  import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Ellipsis } from "@lucide/svelte"
  import {
    Pagination,
    PaginationEllipsis,
    PaginationFirst,
    PaginationItem,
    PaginationLast,
    PaginationLink,
    PaginationList,
    PaginationNext,
    PaginationPrevious,
  } from "$lib/components/pagination"
<\/script>

<Pagination aria-label="Pagination" pageCount={20} defaultPage={10} siblings={2}>
  <PaginationList>
    {#snippet children(state)}
      <PaginationItem>
        <PaginationFirst aria-label="First page"><ChevronsLeft aria-hidden="true" /></PaginationFirst>
      </PaginationItem>
      <PaginationItem>
        <PaginationPrevious aria-label="Previous page"><ChevronLeft aria-hidden="true" /></PaginationPrevious>
      </PaginationItem>
      {#each state.items as item (item)}
        <PaginationItem>
          {#if typeof item === "number"}
            <PaginationLink page={item} />
          {:else}
            <PaginationEllipsis><Ellipsis aria-hidden="true" /></PaginationEllipsis>
          {/if}
        </PaginationItem>
      {/each}
      <PaginationItem>
        <PaginationNext aria-label="Next page"><ChevronRight aria-hidden="true" /></PaginationNext>
      </PaginationItem>
      <PaginationItem>
        <PaginationLast aria-label="Last page"><ChevronsRight aria-hidden="true" /></PaginationLast>
      </PaginationItem>
    {/snippet}
  </PaginationList>
</Pagination>`

  const variantsCode = `<script lang="ts">
  import { Pagination, PaginationItem, PaginationLink, PaginationList } from "$lib/components/pagination"
<\/script>

<div class="space-y-3">
  <Pagination aria-label="Soft pagination" pageCount={5} defaultPage={3}>
    <PaginationList>
      {#each [1, 2, 3, 4, 5] as page (page)}
        <PaginationItem><PaginationLink {page} /></PaginationItem>
      {/each}
    </PaginationList>
  </Pagination>
  <Pagination aria-label="Solid pagination" pageCount={5} defaultPage={3}>
    <PaginationList>
      {#each [1, 2, 3, 4, 5] as page (page)}
        <PaginationItem><PaginationLink {page} variant="solid" /></PaginationItem>
      {/each}
    </PaginationList>
  </Pagination>
  <Pagination aria-label="Outline pagination" pageCount={5} defaultPage={3}>
    <PaginationList>
      {#each [1, 2, 3, 4, 5] as page (page)}
        <PaginationItem><PaginationLink {page} variant="outline" /></PaginationItem>
      {/each}
    </PaginationList>
  </Pagination>
</div>`

  let page = $state(1)
  let pageSize = $state(20)
  const total = 95
</script>

<svelte:head>
  <title>Pagination — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Pagination"
  description="Navigate pages with buttons, links, or your router. Wraps the ui-sdk Pagination with a stable page range, ellipsis gaps and focus that survives the moving window."
  entry="@ui-sdk/svelte/pagination"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/pagination</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Name the navigation with <code class="font-mono text-accent">aria-label</code>, then render the
      list's <code class="font-mono text-accent">children</code> snippet: its
      <code class="font-mono text-accent">state.items</code> holds page numbers and the strings
      <code class="font-mono text-accent">"ellipsis-start"</code> /
      <code class="font-mono text-accent">"ellipsis-end"</code>. Render a link for each number and an
      ellipsis for each gap, keyed by the item itself so a page keeps its element as the range moves.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="Choose a page, or use Previous and Next. Steps at an end stay focusable but do nothing." code={usageCode}>
      <Pagination aria-label="Pagination" pageCount={10}>
        <PaginationList>
          {#snippet children(state)}
            <PaginationItem>
              <PaginationPrevious>
                <ChevronLeft aria-hidden="true" />
                <span class="sr-only">Previous</span>
              </PaginationPrevious>
            </PaginationItem>
            {#each state.items as item (item)}
              <PaginationItem>
                {#if typeof item === "number"}
                  <PaginationLink page={item} />
                {:else}
                  <PaginationEllipsis><Ellipsis aria-hidden="true" /></PaginationEllipsis>
                {/if}
              </PaginationItem>
            {/each}
            <PaginationItem>
              <PaginationNext>
                <span class="sr-only">Next</span>
                <ChevronRight aria-hidden="true" />
              </PaginationNext>
            </PaginationItem>
          {/snippet}
        </PaginationList>
      </Pagination>
    </Demo>

    <Demo title="Controlled with total" description="bind:page controls the pagination; total and pageSize compute the page count." code={controlledCode}>
      <div class="w-full max-w-md space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <p class="text-sm text-muted">
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total}
          </p>
          <label class="flex items-center gap-2 text-sm text-muted">
            Rows per page
            <select
              class="rounded-md border border-line bg-surface px-2 py-1 text-sm text-fg"
              value={pageSize}
              onchange={(event) => {
                pageSize = Number(event.currentTarget.value)
                page = 1
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </label>
        </div>
        <Pagination bind:page aria-label="Pagination" {total} {pageSize}>
          <PaginationList>
            {#snippet children(state)}
              <PaginationItem>
                <PaginationPrevious>Previous</PaginationPrevious>
              </PaginationItem>
              {#each state.items as item (item)}
                <PaginationItem>
                  {#if typeof item === "number"}
                    <PaginationLink page={item} />
                  {:else}
                    <PaginationEllipsis />
                  {/if}
                </PaginationItem>
              {/each}
              <PaginationItem>
                <PaginationNext>Next</PaginationNext>
              </PaginationItem>
            {/snippet}
          </PaginationList>
        </Pagination>
      </div>
    </Demo>

    <Demo title="First and Last" description="PaginationFirst and PaginationLast jump to the ends; siblings={2} widens the window." code={firstLastCode}>
      <Pagination aria-label="Pagination" pageCount={20} defaultPage={10} siblings={2}>
        <PaginationList>
          {#snippet children(state)}
            <PaginationItem>
              <PaginationFirst aria-label="First page"><ChevronsLeft aria-hidden="true" /></PaginationFirst>
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious aria-label="Previous page"><ChevronLeft aria-hidden="true" /></PaginationPrevious>
            </PaginationItem>
            {#each state.items as item (item)}
              <PaginationItem>
                {#if typeof item === "number"}
                  <PaginationLink page={item} />
                {:else}
                  <PaginationEllipsis><Ellipsis aria-hidden="true" /></PaginationEllipsis>
                {/if}
              </PaginationItem>
            {/each}
            <PaginationItem>
              <PaginationNext aria-label="Next page"><ChevronRight aria-hidden="true" /></PaginationNext>
            </PaginationItem>
            <PaginationItem>
              <PaginationLast aria-label="Last page"><ChevronsRight aria-hidden="true" /></PaginationLast>
            </PaginationItem>
          {/snippet}
        </PaginationList>
      </Pagination>
    </Demo>

    <Demo title="Link variants" description="variant on PaginationLink styles the current page: soft, solid or outline." code={variantsCode}>
      <div class="space-y-3">
        <Pagination aria-label="Soft pagination" pageCount={5} defaultPage={3}>
          <PaginationList>
            {#each [1, 2, 3, 4, 5] as p (p)}
              <PaginationItem><PaginationLink page={p} /></PaginationItem>
            {/each}
          </PaginationList>
        </Pagination>
        <Pagination aria-label="Solid pagination" pageCount={5} defaultPage={3}>
          <PaginationList>
            {#each [1, 2, 3, 4, 5] as p (p)}
              <PaginationItem><PaginationLink page={p} variant="solid" /></PaginationItem>
            {/each}
          </PaginationList>
        </Pagination>
        <Pagination aria-label="Outline pagination" pageCount={5} defaultPage={3}>
          <PaginationList>
            {#each [1, 2, 3, 4, 5] as p (p)}
              <PaginationItem><PaginationLink page={p} variant="outline" /></PaginationItem>
            {/each}
          </PaginationList>
        </Pagination>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="PaginationLink variant"
      rows={[
        { name: "soft", type: "default", description: "The current page sits on a tinted accent-soft background." },
        { name: "solid", type: "string", description: "The current page is a solid accent chip." },
        { name: "outline", type: "string", description: "Every page has a border; the current one's border turns accent." },
      ]}
    />
    <p class="text-sm text-muted">
      State attributes for styling: <code class="font-mono text-accent">data-current</code> (with
      <code class="font-mono text-accent">aria-current="page"</code>) on the current link, and
      <code class="font-mono text-accent">data-disabled</code> (with
      <code class="font-mono text-accent">aria-disabled</code>) on a step at its end. The root, list,
      items and ellipsis have none.
    </p>
    <p class="text-sm text-muted">
      With <code class="font-mono text-accent">getHref</code>, links and steps render as anchors that
      work before JavaScript loads; without it they are buttons. A step at its end loses its
      <code class="font-mono text-accent">href</code> but stays in the tab order as a button.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Pagination (root)"
      rows={[
        { name: "page", type: "number", description: "The current page, from 1. Bind with bind:page to control." },
        { name: "defaultPage", type: "number", default: "1", description: "The page it starts on, when uncontrolled." },
        { name: "pageCount", type: "number", description: "How many pages there are. Or pass total and pageSize." },
        { name: "total", type: "number", description: "How many items there are; pageCount is computed from pageSize, minimum one." },
        { name: "pageSize", type: "number", default: "10", description: "How many items fit on a page, with total." },
        { name: "siblings", type: "number", default: "1", description: "Pages shown on each side of the current one. The window slides near an end instead of shrinking." },
        { name: "boundaries", type: "number", default: "1", description: "Pages always shown at each end." },
        { name: "getHref", type: "(page) => string", description: "Maps a page to a URL; parts render as anchors. Modifier and middle clicks leave state alone." },
        { name: "onPageChange", type: "(page, details) => void", description: "Runs when the page wants to change. details.cancel() keeps the page and stops a link from navigating." },
        { name: "controller", type: "PaginationController", description: "Page from anywhere via createPaginationController(): setPage, next, previous, first, last." },
        { name: "aria-label", type: "string", description: "Names the navigation landmark." },
      ]}
    />
    <PropsTable
      caption="PaginationLink"
      rows={[
        { name: "page", type: "number", description: "The page the link goes to, from 1. Required." },
        { name: "variant", type: '"soft" | "solid" | "outline"', default: '"soft"', description: "How the current page is highlighted." },
        { name: "children", type: "Snippet<[PaginationLinkState]>", description: "Custom content; state carries page and current. Shows the page number by default." },
        { name: "render", type: "Snippet", description: "Replace the link element, e.g. with a router link; receives props (href included), state and children." },
      ]}
    />
    <PropsTable
      caption="PaginationPrevious / PaginationNext / PaginationFirst / PaginationLast"
      rows={[
        { name: "aria-label", type: "string", description: "Names the step when its content is only an icon." },
        { name: "children", type: "Snippet<[PaginationStepState]>", description: "Content; state carries the page it goes to and whether it's disabled." },
        { name: "render", type: "Snippet", description: "Replace the step element; receives props, state and children." },
      ]}
    />
    <PropsTable
      caption="PaginationList / PaginationItem / PaginationEllipsis"
      rows={[
        { name: "children", type: "Snippet<[PaginationState]>", description: "On the list: receives page, pageCount and items. Render a link or ellipsis per item, keyed by the item." },
        { name: "class", type: "string", description: "Merged with the wrapper classes; user classes win." },
        { name: "render", type: "Snippet", description: "Replace the part's element; receives props, state and children." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>A <code class="font-mono text-accent">navigation</code> landmark named with <code class="font-mono text-accent">aria-label</code>, containing a list of links or buttons. The list keeps its <code class="font-mono text-accent">list</code> role even without bullets, which Safari would otherwise drop.</li>
      <li>The current page's link carries <code class="font-mono text-accent">aria-current="page"</code> and <code class="font-mono text-accent">data-current</code>.</li>
      <li>Steps at an end get <code class="font-mono text-accent">aria-disabled="true"</code> and <code class="font-mono text-accent">data-disabled</code>, do nothing, and stay in the tab order as buttons.</li>
      <li>Ellipses are hidden from screen readers. Give icon-only steps text or an <code class="font-mono text-accent">aria-label</code>.</li>
      <li>Focus survives the moving range: a clicked page keeps focus as the window slides, and paging with the keyboard never loses focus. Key range entries by their value, not their index.</li>
      <li><span class="text-fg">Enter</span> and <span class="text-fg">Space</span> activate a focused page or step. With <code class="font-mono text-accent">getHref</code>, modifier clicks open the link elsewhere without changing the page.</li>
    </ul>
  </Section>
</div>