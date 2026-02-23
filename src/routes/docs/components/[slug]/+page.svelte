<script lang="ts">
    import { page } from "$app/stores";
    import ComponentPage from "$lib/components/ComponentPage.svelte";
    import { components } from "$lib/data/registry";

    let slug = $derived($page.params.slug);
    let item = $derived(components.find((x) => x.slug === slug));
</script>

<svelte:head
    ><title>{item?.name ?? "Component"} — Components</title></svelte:head
>

<ComponentPage title="Components" {item} backHref="/docs/components" />
