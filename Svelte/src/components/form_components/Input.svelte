<script>
    import clearIcon from "../../assets/cancel_icon.svg";

    export let name = "";
    export let label = "";
    export let supportingText = "";
    export let type = "text";
    export let minLength = undefined;
    export let maxLength = undefined;
    export let minValue = undefined;
    export let maxValue = undefined;
    export let step = undefined;
    export let validationPattern = undefined;
    export let required = false;
    export let autofocus = false;
    export let defaultValue = "";
    export let errorMessage = undefined;
    export let value = defaultValue;

    let active = false;
    let error = "";

    function handleInput(event) {
        if(event.target.type === "checkbox") {
            value = event.target.checked;
        }else if(event.target.type === "number" || event.target.type === "range") {
            value = +event.target.value;
        }else {
            value = event.target.value;
        }
    }

    function handleBlur(event) {
        error = event.target.validationMessage || "";
        active = false;
    }

    function handleInvalid(event) {
        error = event.target.validationMessage || "";
    }
</script>

<style>
    .container {
        display: flex;
        flex-flow: column nowrap;
        font-size: 1rem;
        position: relative;
    }

    label {
        position: absolute;
        top: 0em;
        left: 0em;
        z-index: 1;
        color: #1f1b16;
        transform: translate(1.5em, 1.5em) scale(1);
        transition: color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
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

    label.small-label {
        transform: translate(0.8em, 0.3em) scale(0.8);
    }

    .control {
        display: flex;
        flex-flow: row nowrap;
        background-color: #EFE0CF;
        border-radius: 0.25rem 0.25rem 0 0;
        position: relative;
        padding-right: 0.75em;
    }

    .control input {
        border: none;
        outline: none;
        background: none;
        font-size: 1em;
        padding: 1.5em 1em 0.5em 1em;
        flex: 1 1;
    }

    .control-error input {
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
    <label for={name} class:small-label={active || value}>
        {label}
    </label>
    <div class="control" class:control-error={error}>
        <!-- svelte-ignore a11y-autofocus -->
        <input
            {name}
            {type}
            {minLength}
            {maxLength}
            {step}
            {required}
            {autofocus}
            min={minValue}
            max={maxValue}
            pattern={validationPattern}
            {value}
            on:focus={() => active = true}
            on:blur={handleBlur}
            on:input={handleInput}
            on:invalid={handleInvalid}
            on:keydown
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
