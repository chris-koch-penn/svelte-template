<script>
  import { onMount, createEventDispatcher, tick } from "svelte";
  export let formattedSelected;
  const dispatch = createEventDispatcher();

  let once = (el, evt, cb) => {
    function handler() {
      cb.apply(this, arguments);
      el.removeEventListener(evt, handler);
    }
    el.addEventListener(evt, handler);
  };

  let popover;
  let w;
  let contentsAnimated;
  let contentsWrapper;
  let translateY = 0;
  let translateX = 0;

  export let open = false;
  export let shrink;
  export const close = () => {
    shrink = true;
    once(contentsAnimated, "animationend", () => {
      shrink = false;
      open = false;
      dispatch("closed");
    });
  };

  function checkForFocusLoss(evt) {
    if (!open) return;
    let el = evt.target;
    // eslint-disable-next-line
    do {
      if (el === popover) return;
      // eslint-disable-next-line
    } while ((el = el.parentNode));
    close();
  }

  onMount(() => {
    document.addEventListener("click", checkForFocusLoss);

    // eslint-disable-next-line
    return () => {
      document.removeEventListener("click", checkForFocusLoss);
    };
  });

  const getDistanceToEdges = async () => {
    if (!open) {
      open = true;
    }
    await tick();
    let rect = contentsWrapper.getBoundingClientRect();
    return {
      top: rect.top + -1 * translateY,
      bottom: window.innerHeight - rect.bottom + translateY,
      left: rect.left + -1 * translateX,
      right: document.body.clientWidth - rect.right + translateX
    };
  };

  const getTranslate = async () => {
    let dist = await getDistanceToEdges();
    let x;
    let y;
    if (w < 480) {
      y = dist.bottom;
    } else if (dist.top < 0) {
      y = Math.abs(dist.top);
    } else if (dist.bottom < 0) {
      y = dist.bottom;
    } else {
      y = 0;
    }
    if (dist.left < 0) {
      x = Math.abs(dist.left);
    } else if (dist.right < 0) {
      x = dist.right;
    } else {
      x = 0;
    }
    return { x, y };
  };

  const doOpen = async () => {
    const { x, y } = await getTranslate();

    translateX = x;
    translateY = y;
    open = true;

    dispatch("opened");
  };
</script>

<style>
  .contents-wrapper {
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
    transition: none;
    z-index: 1000;
    display: none;
  }

  .contents {
    background: #fff;
    box-shadow: 0px 10px 26px rgba(0, 0, 0, 0.4);
    opacity: 0.8;
    padding-top: 0;
    display: none;
    animation: grow 200ms forwards cubic-bezier(0.92, 0.09, 0.18, 1.05);
  }

  .contents-inner {
    animation: fadeIn 400ms forwards;
  }

  .contents-wrapper.visible {
    display: block;
  }

  .contents-wrapper.visible .contents {
    opacity: 1;
    transform: scale(1);
    display: block;
  }

  .contents-wrapper.shrink .contents {
    animation: shrink 150ms forwards cubic-bezier(0.92, 0.09, 0.18, 1.05);
  }

  @keyframes grow {
    0% {
      transform: scale(0.9, 0.1);
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes shrink {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: scale(0.9, 0.1);
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .calendar-button {
    outline: none;
    transition: transform 80ms ease-in;
    border: 0.1rem solid #d1d1d1;
    appearance: none;
    background-color: transparent;
    border: 0.1rem solid #d1d1d1;
    border-radius: 0.4rem;
    box-shadow: none;
    box-sizing: inherit;
    padding: 0.6rem 1rem;
    font-size: 100%;
    line-height: 1.15;
    overflow: visible;
    outline: none;
    color: #3f3f3f;
  }
</style>

<svelte:window bind:innerWidth={w} />
<div bind:this={popover}>
  <button class="calendar-button" type="button" on:click={doOpen}>
    {formattedSelected}
  </button>
  <div
    class="contents-wrapper"
    class:visible={open}
    class:shrink
    style="transform: translate(-50%,-50%) translate({translateX}px, {translateY}px)"
    bind:this={contentsWrapper}>
    <div class="contents" bind:this={contentsAnimated}>
      <div class="contents-inner">
        <slot name="contents" />
      </div>
    </div>
  </div>
</div>
