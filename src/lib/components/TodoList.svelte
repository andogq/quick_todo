<script lang="ts">
    import TodoItem from "$lib/components/TodoItem.svelte";
    import list from "$lib/stores/list";

    $: done_count = $list.filter(({ done }) => done).length;

    let new_todo = "";
    $: valid_todo = new_todo.trim().length > 0;

    function add_todo() {
        new_todo = new_todo.trim();

        if (valid_todo) $list = [...$list, {
            id: $list.length,
            title: new_todo.trim(),
            done: false
        }];

        new_todo = "";
    }
</script>

<p>Completed: {done_count}/{$list.length} ({Math.round(done_count / $list.length * 100) || 0}%)</p>

<div id="list">
    {#each $list as {title, done}}
        <TodoItem {title} bind:done />
    {/each}
</div>

<div id="new">
    <input type="text" placeholder="Remember to..." bind:value={new_todo} />
    <button on:click={add_todo} disabled={!valid_todo}>Add</button>
</div>
