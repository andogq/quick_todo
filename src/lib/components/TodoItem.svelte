<script lang="ts">
    export let title: string;
    export let done: boolean;
</script>

<div id="container">
    <input type="checkbox" bind:checked={done} />

    <p>{title}</p>
</div>

<style>
    #container {
        display: flex;
        flex-direction: row;
    }

    input[type="checkbox"]:checked ~ p {
        text-decoration-line: line-through;
    }
</style>

