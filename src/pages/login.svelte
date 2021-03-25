<script>
  import { navigate } from "svelte-routing";
  import { getAxiosConfig } from "../lib/http.js";
  import axios from "axios";
  import { jwtStore, username, segment } from "../lib/stores.js";
  import { isValidUsername } from "../lib/utils.js";
  export let params = {};
  let data = window.decodeURIComponent(params.tab);
  jwtStore.useLocalStorage();
  username.useLocalStorage();
  segment.useLocalStorage();
  segment.set("login");

  let isRightPanelActive = data === "signup";
  let user = "",
    password = "",
    confirmPassword = "",
    registrationDisabled = false;

  async function signup(event) {
    let isValid = validateProfile();
    if (!isValid || registrationDisabled) return;
    registrationDisabled = true;

    try {
      let res = await axios.post(
        "/auth/signup",
        {
          password: password,
          user: user.toLowerCase()
        },
        getAxiosConfig()
      );
      console.log(res);

      processSuccessfulAuthEvent(res);
    } catch (err) {
      console.log(err);
      handleError(err, "An account with the same username already exists.");
    }

    setInterval(() => (registrationDisabled = false), 1500);
  }

  function handleError(err, msg) {
    if (msg) {
      alert(msg);
    } else {
      alert(
        "Something went wrong! Please check your internet connection, refresh the page, or try again later."
      );
    }
  }

  function validateProfile() {
    if (!user || !password || !confirmPassword) {
      alert("Some fields were left blank");
      return false;
    } else if (password.length < 6) {
      alert("Password must be at least six letters long");
      return false;
    } else if (!isValidUsername(user)) {
      alert("Invalid user");
      return false;
    } else if (confirmPassword !== password) {
      alert("Passwords must match.");
      return false;
    }

    return true;
  }

  async function login() {
    try {
      // Send login request to server.
      let res = await axios.post(
        "/auth/login",
        {
          user: user.toLowerCase(),
          password: password
        },
        getAxiosConfig()
      );

      processSuccessfulAuthEvent(res);
    } catch (err) {
      console.log(err.response);
      handleError(err, "Incorrect password or username.");
    }
  }

  function processSuccessfulAuthEvent(res) {
    // Get JWT from request and put in local storage.
    if (res.data) {
      console.log("HERE: ", JSON.stringify(res.data));
      jwtStore.set(res.data.jwt);
      username.set(user);
      navigate("/profile");
    }
  }
</script>

<style>
  .title {
    font-family: "Ubuntu";
    font-size: 4em;
    font-weight: 100;
    margin-bottom: 0%;
  }
  .toplevel {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
  }

  * {
    box-sizing: border-box;
  }

  h1 {
    font-weight: bold;
    margin: 0;
  }

  p {
    font-size: 14px;
    font-weight: 300;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }

  .dull-link {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }

  button {
    border-radius: 20px;
    border: 1px solid var(--main-color);
    background-color: var(--main-color);
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
  }

  button:active {
    transform: scale(0.95);
  }

  button:focus {
    outline: none;
  }

  button.ghost {
    background-color: transparent;
    border-color: #ffffff;
  }

  form {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
  }

  input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
  }

  .container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
  }

  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
  }

  .log-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
  }

  .container.right-panel-active .log-in-container {
    transform: translateX(100%);
  }

  .sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
  }

  .container.right-panel-active .log-in-container {
    opacity: 0;
  }

  .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 15;
    /* // animation: show 0.6s; */
  }

  @keyframes show {
    0%,
    49.99% {
      opacity: 0;
      z-index: 1;
    }

    50%,
    100% {
      opacity: 1;
      z-index: 5;
    }
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
  }

  .container.right-panel-active .overlay-container {
    transform: translateX(-100%);
  }

  .overlay {
    background: var(--main-color);
    background: -webkit-linear-gradient(
      to right,
      var(--secondary-color),
      var(--main-color)
    );
    background: linear-gradient(
      to right,
      var(--secondary-color),
      var(--main-color)
    );
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .container.right-panel-active .overlay {
    transform: translateX(50%);
  }

  .overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .overlay-left {
    transform: translateX(-20%);
  }

  .container.right-panel-active .overlay-left {
    transform: translateX(0);
  }

  .overlay-right {
    right: 0;
    transform: translateX(0);
  }

  .container.right-panel-active .overlay-right {
    transform: translateX(20%);
  }
  .no-out {
    outline: none;
  }
</style>

<div class="toplevel main-padding">
  <div style="text-align: center;margin-bottom:2%;">
    <h1 class="primary title" style="font-family: 'Ubuntu';">Fake Company</h1>
    <p style="font-family:montserrat; font-size:1em;">
      We do things better than other people do things
    </p>
  </div>
  <div
    class="container"
    class:right-panel-active={isRightPanelActive}
    id="container">
    <div class="form-container sign-up-container">
      <form on:submit|preventDefault={signup}>
        <h1 style="margin-bottom: 3%;">Create Account</h1>
        <input
          required
          type="text"
          placeholder="Username"
          bind:value={user}
          class="no-out" />
        <input
          required
          type="password"
          placeholder="Password"
          bind:value={password}
          class="no-out" />
        <input
          required
          type="password"
          placeholder="Confirm Password"
          bind:value={confirmPassword}
          class="no-out" />
        <button style="margin-top: 3%;" type="submit">Sign Up</button>
      </form>
    </div>
    <div class="form-container log-in-container">
      <form on:submit|preventDefault={login}>
        <h1 style="margin-bottom: 3%;">Sign in</h1>
        <input
          required
          type="text"
          placeholder="Username"
          bind:value={user}
          class="no-out" />
        <input
          required
          type="password"
          placeholder="Password"
          bind:value={password}
          class="no-out" />
        <a href="/forgotpassword" class="dull-link">Forgot your password?</a>
        <button type="submit">Sign In</button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>Sign in to your Fake Company account here</p>
          <button class="ghost" on:click={() => (isRightPanelActive = false)}>
            Sign In
          </button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p>
            Sign up for a Fake Company account today to get access to a better
            email and productivity experience.
          </p>
          <button class="ghost" on:click={() => (isRightPanelActive = true)}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </div>
  <p>
    By signing up, you consent to the
    <a href="/tos.html" target="_blank" class="primary">Terms and Conditions</a>
    and
    <a href="/privacy.html" target="_blank" class="primary">Privacy Policy</a>
  </p>
</div>
