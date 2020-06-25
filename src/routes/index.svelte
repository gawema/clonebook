<script>
  import Nav from "../sections/Nav.svelte";
  import FriendsList from "../sections/FriendsList.svelte";
  import PostsContainer from "../sections/PostsContainer.svelte";
  import ChatContainer from "../sections/ChatContainer.svelte";

  import { getRequest } from "./../utils/getRequest.js";
  import { checkSession } from "./../utils/checkSession.js";

  import { profile } from "./../store.js";
  import { storePosts } from "./../store.js";
  import { onMount } from "svelte";

  $: loading = true;

  onMount(() => {
    getDataUser();
    getPosts();
    getSession();
  });

  const getSession = async () => {
    let response = await getRequest("/users/session");
    if (response.type !== "success" || !localStorage.getItem("token")) {
      location.href = `/login`;
    }
  };

  const getPosts = async () => {
    let response = await getRequest("/posts");
    $storePosts = response.posts;
    loading = false;
  };

  const getDataUser = async () => {
    let response = await getRequest("/profile");
    $profile = response.user;
  };

</script>

<style>
  #wrapper {
    grid-template-columns: 20fr 60fr 20fr;
  }

  .chatWrapper {
    min-height: 90vh;
    overflow: auto;
  }
</style>

<svelte:head>
	<title>Sveltebook</title>
</svelte:head>

<div id="wrapper" class="grid gap-4">

  <div class="grid chatWrapper pl-8">
    <FriendsList />
  </div>
  <div class="flex justify-center">
    <PostsContainer posts={$storePosts} />
  </div>
  <!-- GROUPS -->
</div>
