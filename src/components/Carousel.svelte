<script>
  import { fade } from "svelte/transition";
  export let nextSlide;
  nextSlide = () => {
    index = (index + 1) % carouselPhotos.length;
  };
  let index = 0;

  const carouselPhotos = [
    "https://picsum.photos/300/200?random=1",
    "https://picsum.photos/300/200?random=2",
    "https://picsum.photos/300/200?random=3"
  ];
</script>

<style>
  img {
    position: absolute;
  }
</style>

{#each [carouselPhotos[index]] as src (index)}
  <img transition:fade {src} alt="" />
{/each}
