<script>
    import clearIcon from "../../assets/cancel_icon.svg";

    export let name = "";
    export let label = "";
    export let supportingText = "";
    export let minLength = undefined;
    export let maxLength = undefined;
    export let required = false;
    export let defaultValue = "";
    export let errorMessage = "";
    export let value = defaultValue;

    let active = false;
    let error = "";

    function handleBlur(event) {
        error = event.target.validationMessage;
        active = false;
    }

    function handleInvalid(event) {
        error = event.target.validationMessage;
    }
</script>

<style>
    .container {
        display: flex;
        flex-flow: column nowrap;
        font-size: 1rem;
        position: relative;
    }

    .container label {
        position: absolute;
        top: 0.3em;
        left: 1em;
        font-size: 0.8em;
        z-index: 1;
        color: #1f1b16;
        transition: color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
    }

    .container-active label {
        color: #4e4539;
    }

    .container-error label {
        color: #ba1a1a;
    }

    .container-active .container-error label {
        color: #ba1a1a;
    }

    .control {
        display: flex;
        flex-flow: row nowrap;
        background-color: #EFE0CF;
        border-radius: 0.25rem 0.25rem 0 0;
        position: relative;
        padding-right: 0.75em;
        padding-top: 1.25em;
    }

    .control textarea {
        border: none;
        outline: none;
        background: none;
        font-size: 1em;
        padding: 0.25em 1em 0.5em 1em;
        flex: 1 1;
        resize: none;
    }

    .control-error textarea {
        color: #ba1a1a;
    }

    .control::before {
        content: "";
        position: absolute;
        left: 0px;
        bottom: 0px;
        right: 0px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.42);
        pointer-events: none;
        transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .control-error::before {
        border-bottom: 1px solid rgba(186, 26, 26, 0.42);
    }

    .container-active .control::before {
        border-bottom: 1px solid rgba(0, 0, 0, 0.87);
    }

    .control::after {
        content: "";
        position: absolute;
        left: 0px;
        bottom: 0px;
        right: 0px;
        border-bottom: 2px solid rgba(78, 69, 57, 0.8);
        transform: scaleX(0);
        pointer-events: none;
        transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    }

    .control-error::after {
        border-bottom: 2px solid rgba(186, 26, 26, 0.8);
    }

    .container-active .control::after {
        transform: scaleX(1);
    }

    .control button {
        border: none;
        outline: none;
        background: none;
        cursor: pointer;
    }

    .control button:hover {
        filter: brightness(125%);
    }

    .control button:focus {
        filter: brightness(150%);
    }

    .control button:active {
        filter: brightness(80%);
    }

    .control img {
        width: 1.5em;
        height: auto;
        flex: 0;
    }

    .support-message {
        padding: 0.5em 1em 0 1em;
        font-size: 0.75em;
        color: #4e4539;
    }

    .error-message {
        padding: 0.5em 1em 0 1em;
        font-size: 0.75em;
        color: #ba1a1a;
    }

</style>

<div
    class="container"
    class:container-active={active}
    class:container-error={error}
>
    <label for={name}>{label}</label>
    <div class="control" class:control-error={error}>
        <textarea
            {name}
            {minLength}
            {maxLength}
            {required}
            bind:value
            on:focus={() => active = true}
            on:blur={handleBlur}
            on:invalid={handleInvalid}
        />
        <button on:click|preventDefault={() => value = defaultValue}>
            <img src={clearIcon} alt="limpar"/>
        </button>
    </div>
    {#if error}
        <span class="error-message">{errorMessage || error}</span>
    {:else if supportingText}
        <span class="support-message">{supportingText}</span>
    {/if}
</div>
