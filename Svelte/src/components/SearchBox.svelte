<script>
    import searchIcon from "../assets/search_icon.svg";

    export let searchQuery = "";
</script>

<style>
    div.container {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: flex-start;
        gap: 0.5rem;
        height: 3rem;
        background-color: #efe0cf;
        border-radius: 28px;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
        font-size: 1rem;
        padding: 0 1.25rem;
    }

    input {
        flex: 1;
        height: 1.5em;
        background: none;
        border: none;
        outline: none;
        color: #4e4539;
        text-overflow: ellipsis;
    }

    img {
        width: 1.5em;
        height: 1.5em;
    }
</style>

<div class="container">
    <input
        name="search-box"
        type="text"
        placeholder="Pesquise por título, descrição, autor, etc."
        bind:value={searchQuery}
    />
    <img src={searchIcon} alt="pesquisar"/>
</div>

