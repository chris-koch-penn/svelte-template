<script>
  import { jwtStore, username, segment } from "../lib/stores.js";
  import { navigate } from "svelte-routing";
  jwtStore.useLocalStorage();
  username.useLocalStorage();
  segment.useLocalStorage();
  segment.set("profile");

  function logout() {
    jwtStore.set("");
    username.set("");
    navigate("/");
  }
</script>

<style>
  .toplevel {
    text-align: center;
    margin-top: 5%;
  }

  h1 {
    color: #de5764;
    font-family: "Ubuntu";
    font-size: 5em;
    margin-bottom: 20px;
  }

  .logout-btn,
  .logout-btn:hover {
    background-color: var(--main-color);
    color: white;
    user-select: none;
    border: none;
    outline: none;
    padding: 10px 45px;
  }
  .logout-btn:active,
  .logout-btn:focus {
    background-color: white;
    color: var(--main-color);
    border: none;
    outline: none;
  }
</style>

<div class="toplevel">

  <h1 class="primary py-5">My Account</h1>

  <p class="d-flex justify-content-center">
    {#if $username}
      This is your account,
      <span class="primary">&nbsp;{$username}</span>
      .
    {:else}This is your account.{/if}
    There's not much here.
  </p>
  <div class="button_cont pt-5" align="center">
    <a class="btn btn-lg rounded-pill logout-btn" href="#" on:click={logout}>
      Log out
    </a>
  </div>
</div>
