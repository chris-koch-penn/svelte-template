<script>
  import { Router, Route } from "svelte-routing";
  import Login from "./pages/login.svelte";
  import Profile from "./pages/profile.svelte";
  import Splash from "./pages/splash.svelte";
  export let url = "";

  const routes = [
    { path: "/profile", component: Profile },
    { path: "/login", component: Login },
    { path: "/", component: Splash }
  ];
</script>

<Router {url}>
  {#each routes as route}
    <Route path={route.path} let:params>
      <svelte:component this={route.component} {params} />
    </Route>
  {/each}
</Router>
