<script>
  import { links, link, Router } from "svelte-routing";
  import { segment, isSignedIn } from "../lib/stores.js";
  segment.useLocalStorage();
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(var(--main-color), 0.13);
    font-weight: 300;
    padding: 0 1em;
    display: flex;
    justify-content: space-between;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: var(--main-color);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none !important;
    padding: 1em 0.5em;
    display: block;
    color: inherit !important;
    outline: none !important;
  }
</style>

<nav use:links>
  <Router>
    <ul>
      <li>
        <a class:selected={$segment === 'home'} href="/" id="home-tab">Home</a>
      </li>
      <li>
        <a class:selected={$segment === 'login'} href="/login" id="login-tab">
          Login
        </a>
      </li>
    </ul>
    <li>
      <a
        class:selected={$segment === 'profile'}
        class="profile"
        href="/profile"
        id="profile-tab">
        Account
      </a>
    </li>
  </Router>
</nav>
