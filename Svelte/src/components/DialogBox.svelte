<style>
    .overlay {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .container {
        width: fit-content;
        height: fit-content;
        background: linear-gradient(0deg, rgba(126, 87, 0, 0.11), rgba(126, 87, 0, 0.11)), #fffbff;
        padding: 1.5rem;
        border-radius: 1.5rem;
        font-size: 1rem;
    }
</style>

<div class="overlay">
    <div class="container">
        <slot/>
    </div>
</div>
