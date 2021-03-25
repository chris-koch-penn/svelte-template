<script>
  import { onMount } from "svelte";
  import { Maximize2Icon, Minimize2Icon } from "svelte-feather-icons";
  export let isExpanded = false;
  export let textChangeCallback;
  let currentId;
  let hasLoaded = false;
  let num_changes = 0;

  function initializeQuill() {
    document.getElementById("dummy-toolbar").remove();
    document.getElementById("dummy-editor").remove();
    hasLoaded = true;
    var fontSizeStyle = Quill.import("attributors/style/size");
    fontSizeStyle.whitelist = ["12px", "20px", "28px", "36px", "44px"];
    Quill.register(fontSizeStyle, true);
    var quill = new window.Quill("#editor", {
      modules: {
        toolbar: "#toolbar"
      },
      theme: "snow"
    });

    // Store accumulated changes
    let lastSaveLength = quill.root.innerHTML;
    quill.on("text-change", function(delta) {
      let html = quill.root.innerHTML;
      if (Math.abs(html.length - lastSaveLength) > 10) {
        textChangeCallback(currentId, html);
        lastSaveLength = html.length;
      }
    });

    window.callOnEntryChange = entry => {
      currentId = entry.note_id;
      quill.root.innerHTML = entry.text;
      lastSaveLength = quill.root.innerHTML.length;
    };

    window.quillHTML = () => quill.root.innerHTML;

    // Check for unsaved data
    window.onbeforeunload = function() {
      let html = quill.root.innerHTML;
      textChangeCallback(currentId, html);
    };
  }
</script>

<style>
  @import "../assets/theme.scss";

  #editor {
    height: 100%;
    word-break: break-all;
  }
  #dummy-editor {
    min-height: calc(90% - 43.86px - 30px);
    border: 1px solid #ccc;
    border-top: 0px;
  }
  #dummy-toolbar {
    min-height: 42px;
    border: 1px solid #ccc;
  }
  .default-font {
    font-size: 20px !important;
  }

  .hide {
    display: none;
  }
  .expand-contract {
    outline: none;
    background-color: white;
    border: none;
  }
</style>

<svelte:head>
  <script
    src="https://cdn.quilljs.com/1.3.6/quill.min.js"
    on:load={initializeQuill}>

  </script>
</svelte:head>

<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />

<div class="d-flex flex-column h-100">
  <div id="toolbar" class:hide={!hasLoaded}>
    <button class="expand-contract" on:click={() => (isExpanded = !isExpanded)}>
      {#if isExpanded}
        <Minimize2Icon size="16" />
      {:else}
        <Maximize2Icon size="16" />
      {/if}
    </button>
    <select class="ql-size">
      <option value="12px">12px</option>
      <option value="20px" selected>20px</option>
      <option value="28px">28px</option>
      <option value="36px">36px</option>
      <option value="44px">44px</option>
    </select>
    <button class="ql-bold" />
    <button class="ql-italic" />
    <button class="ql-underline" />
    <button class="ql-strike" />
    <button class="ql-list" value="ordered" />
    <button class="ql-list" value="bullet" />
    <button class="ql-script" value="sub" />
    <button class="ql-script" value="super" />
    <button class="ql-indent" value="+1" />
    <button class="ql-indent" value="-1" />
    <select class="ql-color" />
    <select class="ql-background" />
    <button class="ql-clean" />
  </div>
  <div id="dummy-toolbar" />
  <div id="dummy-editor" />
  <div id="editor" class="default-font" />
</div>
