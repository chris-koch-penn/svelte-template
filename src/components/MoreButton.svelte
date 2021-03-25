<script>
  export let wasClicked = false;
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background: #393939;
  }

  button.dots {
    width: 60px;
    height: 30px;
    border: none;
    background: transparent;
    position: relative;
    cursor: pointer;
    margin: 50px;
    &:focus {
      outline: none;
    }

    &.dots {
      &:after,
      &:before,
      span {
        width: 10%;
        height: 20%;
        border-radius: 100px;
        position: absolute;
        left: 0px;
        background: #f6a017;
        transform: rotate(0deg);
        transition: all 0.4s;

        left: 1%;
        right: 1%;
        margin: 0 auto;
      }

      &:after,
      &:before {
        content: "";
      }

      &:after {
        top: -10%;
        margin-top: 0px;
      }

      &:before {
        bottom: -10%;
        margin-bottom: 0px;
      }

      span {
        top: 50%;
        margin-top: -2px;
      }

      .on {
        &:after {
          transform: rotate(135deg) translate(9px, -9px);
          width: 100%;
        }

        &:before {
          transform: rotate(225deg);
          bottom: 50%;
          margin-bottom: -2px;
          width: 100%;
        }

        span {
          transform: rotate(135deg);
        }
      }
    }
  }
</style>

<div>
  <button class:on={wasClicked} on:click={(wasClicked = true)} class="dots">
    <span />
  </button>
</div>
