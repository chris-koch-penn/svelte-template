<script>
  export let checked = false;
  export let scale = 0.65;
  export let disabled = false;
  export let callback = () => {};
</script>

<style>
  @import "../assets/theme.scss";
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin-bottom: 0px !important;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    cursor: pointer;
    background-color: #ccc;
    -webkit-transition: 0.25s;
    transition: 0.25s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    left: 4px;
    top: 4px;
    content: "";
    height: 26px;
    width: 26px;
    background-color: white;
    -webkit-transition: 0.25s;
    transition: 0.25s;
    border-radius: 34px;
  }

  input:checked + .slider {
    background-color: var(--main-color);
  }

  input:checked + .slider {
    box-shadow: 0 0 1px var(--main-color);
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
</style>

<div class="switch" style="transform: scale({scale});">
  <input type="checkbox" bind:checked />
  <div
    class="slider"
    on:click={() => {
      if (!disabled) {
        callback();
      }
    }} />
</div>
