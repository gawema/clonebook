<script>
  export let width;
  export let photoUrl;
</script>

<style>
  .friend {
    min-width: 3rem;
  }
</style>

<section>
  <!-- {console.log(id)} -->
  <div class="friend relative grid items-center justify-center rounded-full">
    <img
      src={photoUrl}
      class="friend-image rounded-full"
      style="width:{width}; height: {width};"
      alt="profile" />
  </div>
</section>
