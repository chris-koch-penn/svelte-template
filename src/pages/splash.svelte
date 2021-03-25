<script>
  import { navigate } from "svelte-routing";
  import { segment } from "../lib/stores.js";
  segment.useLocalStorage();
  segment.set("home");
</script>

<style>
  a {
    color: var(--main-color);
    -webkit-transition: 0.5s;
    -o-transition: 0.5s;
    transition: 0.5s;
  }
  a:hover,
  a:active,
  a:focus {
    color: var(--main-color);
    outline: none;
    text-decoration: none;
  }

  p {
    margin-bottom: 20px;
  }

  ::-webkit-selection {
    color: #fff;
    background: var(--main-color);
  }

  ::-moz-selection {
    color: #fff;
    background: var(--main-color);
  }

  ::selection {
    color: #fff;
    background: var(--main-color);
  }

  h2 {
    color: var(--main-color);
    font-family: "Ubuntu";
    font-size: 5em;
    margin-bottom: 20px;
  }

  .sign-up-btn,
  .sign-up-btn:hover {
    background-color: var(--main-color);
    color: white;
    user-select: none;
    border: none;
    outline: none;
    padding: 10px 45px;
  }
  .sign-up-btn:active,
  .sign-up-btn:focus {
    background-color: white;
    color: var(--main-color);
    border: none;
    outline: none;
  }

  .sign-up-btn2,
  .sign-up-btn2:hover {
    background-color: white;
    color: var(--main-color);
    user-select: none;
    border: none;
    outline: none;
    padding: 10px 45px;
  }

  .red-panel {
    min-height: 60%;
    width: 100%;
    background: var(--main-color);
    background: -webkit-gradient(
      left top,
      right bottom,
      color-stop(0%, var(--main-color)),
      color-stop(100%, var(--secondary-color))
    );
    background: -o-linear-gradient(
      -45deg,
      var(--main-color) 0%,
      var(--secondary-color) 100%
    );
    background: -o-linear-gradient(
      315deg,
      var(--main-color) 0%,
      var(--secondary-color) 100%
    );
    background: linear-gradient(
      135deg,
      var(--main-color) 0%,
      var(--secondary-color) 100%
    );
  }
  .red-panel h2 {
    color: white;
    margin-left: 40px;
  }
  .fa {
    color: var(--main-color);
    font-size: 3em;
    margin-bottom: 20px;
  }
  .shadow {
    box-shadow: 2px 0px 2px 0px #888888 !important;
  }
  h3 {
    text-align: center;
    font-size: 26px;
    font-weight: 300;
    color: #303133;
    line-height: 1.3;
  }
  p {
    color: gray;
  }
  .row {
    margin-left: 0px;
    margin-right: 0px;
  }
  #context-switching {
    color: black;
    font-size: 1.5em;
    font-family: "nunito";
  }
</style>

<div
  class="row flex-column d-flex justify-content-center align-items-center"
  style="min-height:94vh">
  <h2 style="text-align: center;">Fake Company</h2>
  <p
    style="font-family: montserrat; font-size: 1.15em; font-weight: 300;
    line-height: 20px; letter-spacing: 0.5px;">
    We do things better than other people do things
  </p>
  <p style="margin-top: 40px;">
    <a href="/login" class="btn btn-lg rounded-pill sign-up-btn">Sign up</a>
  </p>
</div>

<div class="d-flex flex-column" style="min-height:100vh">
  <div
    class="row d-flex justify-content-center align-items-center red-panel
    flex-grow-1">
    <h2>Fake Company has everything you need</h2>
  </div>
  <div
    class="row justify-content-center align-items-start align-content-center
    shadow flex-grow-1 py-5"
    style="background-color:whitesmoke">
    <div
      class="col-md-3 col-sm-7 d-flex flex-column justify-content-center
      align-items-center mx-4">
      <i class="fa fa-calendar icon" aria-hidden="true" />
      <h3>Fake Service 1</h3>
      <p>
        Run your day in style with the minimalist Fake Service 1 from Fake
        Company.
      </p>
    </div>
    <div
      class="col-md-3 col-sm-7 d-flex flex-column justify-content-center
      align-items-center mx-4">
      <i class="fa fa-trello icon" aria-hidden="true" />
      <h3>Fake Service 2</h3>
      <p>
        Coordinate your team with a no-frills approach using Fake Service 2.
      </p>
    </div>
    <div
      class="col-md-3 col-sm-7 d-flex flex-column justify-content-center
      align-items-center mx-4">
      <i class="fa fa-clipboard icon" aria-hidden="true" />
      <h3>Fake Service 3</h3>
      <p>
        Fake Service 3 is important for peak performance - and it shouldn't have
        to be complicated.
      </p>
    </div>
  </div>
</div>

<div class="shadow" style="min-height: 100vh;">
  <div class="row d-flex justify-content-center p-5">
    <h2 style="font-size:4em" class="text-center">
      Fake Company will help you reach your goals.
    </h2>
  </div>
  <div class="row d-flex justify-content-center">
    <div
      class="col-5 flex-column d-flex justify-content-center align-items-center">
      <p style="font-size:1em">
        "Fake company is one of the best companies to ever exist, and their
        products have signicantly improved our sales and marketing."
        <br />
      </p>
      <strong>- Wikipedia</strong>
    </div>
    <div class="row d-flex justify-content-center mb-5">
      <div
        class="col-10 flex-column d-flex justify-content-center
        align-items-center">
        <br />
        <br />
        <p id="context-switching">
          Fake Company was built to minimize the loss of productivity when
          multi-tasking. With Fake Company, we've created a consistent interface
          for all of the tools you need to do your work. Our consistent design
          patterns allow you to seamlessly switch from reading emails to booking
          meetings to planning projects.
          <br />
          <br />
          You'll rarely have to use a different tool. And it's free, because
          free software is the best software. If you love using Fake Company, we
          recommend buying our Premium Fake Service bundle so that we can keep
          improving and providing you the best experience possible.
        </p>
      </div>
    </div>
  </div>
</div>

<div style="min-height:100vh;background-color: whitesmoke;" class="shadow ">
  <div class="row d-flex justify-content-center pt-5">
    <h2>Nothing here</h2>
  </div>
  <div class="row d-flex justify-content-center">
    <p>Do what you want!</p>
  </div>
</div>

<div style="min-height:100vh" class="shadow row">
  <div class="col-md-7 col-12 p-5">
    <div class="row d-flex justify-content-center">
      <h2>Nothing</h2>
    </div>
    <div
      class="row d-flex justify-content-center align-items-center
      align-content-center">
      <div class="w-100 " style="height:50vh">
        <!-- <Editor style="height:50vh" /> -->
      </div>
    </div>
  </div>
  <div class="col-md-5 col-12 red-panel p-0">
    <div style="min-height:100vh" class="shadow">
      <div
        class="row d-flex justify-content-center align-content-center
        align-items-center h-100 pt-5">
        <h2 class="text-center">And more</h2>
      </div>
      <div
        class="row d-flex justify-content-center align-items-center
        align-content-center p-2">
        <div
          class="p-5 d-flex flex-column justify-content-center
          align-items-center">
          <p style="color:white;font-size:24px;font-family:nunito">
            Fake Company has everything you need to do your work, in one place
            and with a beautiful design. Try Fake Company and experience the
            power of minimalist design today.
          </p>
          <p style="margin-top: 40px;">
            <a href="/login" class="btn btn-lg rounded-pill sign-up-btn2">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
