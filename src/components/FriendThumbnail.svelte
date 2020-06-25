<script>
  export let status;
  export let photoUrl;
</script>

<style>
  .status {
    border: 2px solid gray;
    box-sizing: content-box;
  }
</style>

<section>
  <div class="status relative h-8 w-8 rounded-full" style={status === 0 ? 'border-color: gray;' : 'border-color: green;'}>
    <img src={photoUrl} class="h-8 w-8 rounded-full" alt="profile" />
  </div>
</section>
