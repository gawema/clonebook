<script>
  import IconThumbnail from "../components/IconThumbnail.svelte";
  import CreatePost from "../components/CreatePost.svelte";
  import Post from "../components/Post.svelte";
  import { profile, storePosts, postModal } from "../store.js";

  export let posts;

  const onOpenModal = () => {
    $postModal.show = true;
  };
</script>

<style>
  section {
    width: 580px;
  }
</style>

<section class="m-4">
  <CreatePost />
  <section id="postsSectionContainer">
    {#if posts}
      {#each posts as post}
        <Post {post} />
      {/each}
    {/if}
  </section>
</section>
