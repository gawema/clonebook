<script>
  import Nav from "../sections/Nav.svelte";
  import PostModal from "../components/PostModal.svelte";
  import ChatContainer from "../sections/ChatContainer.svelte";
  import { postModal } from "./../store.js";

	export let segment;

</script>

<style>
  main {
    padding-top: 70px
  }
</style>

<Nav {segment}/>
<PostModal />
<main>
  <slot />
  <ChatContainer />
</main>
