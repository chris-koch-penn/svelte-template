<script>
  import Routes from "./Routes.svelte";
  import Nav from "./components/Nav.svelte";
</script>

<style>
  :global(.main-padding) {
    padding: 2em;
  }

  :global(.primary) {
    color: var(--main-color);
  }

  :global(.align-center) {
    align-items: center;
  }

  :global(.margin-h10) {
    margin: 0 10px;
  }

  :global(html, body) {
    height: 100%;
  }

  :global(.box-shadow1) {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.46) !important;
  }

  :global(.div-button) {
    text-align: center;
    cursor: pointer;
    user-select: none;
    box-sizing: border-box;
    padding: 1px 7px 2px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186);
  }

  :global(.custom-checkbox) {
    -webkit-appearance: none;
    appearance: none;
    background-color: white;
    border: 1px solid #b2b2b2;
    height: 16px;
    width: 16px;
    border-radius: 4px;
    margin: 2px;
    cursor: default;
    outline: none;
    box-sizing: border-box;
  }
  :global(.custom-checkbox:checked) {
    color: white;
    background-color: var(--main-color);
    font-size: 12px;
    line-height: 16px;
    border: none;
    margin: 2px;
  }
  :global(.custom-checkbox:checked:after) {
    content: "\2713";
    margin-left: 3px;
  }
  :global(.action-button) {
    margin: 2% 0 2% 0;
    width: 30%;
    font-size: 20px;
    height: 35px;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    transition: 0.3s;
    color: var(--main-color);
  }
  :global(.action-button:active) {
    color: black;
    border: none;
  }
</style>

<Nav />
<Routes />
