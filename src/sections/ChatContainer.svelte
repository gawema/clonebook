<script>
  import ChatWindow from "../components/ChatWindow.svelte";
  import { profile } from "../store.js";

  $: activeChats = $profile.activeChats;
</script>

<style>
  section {
    bottom: 0px;
    left: 0px;
    width: 25%;
  }
</style>

<section class="fixed flex justify-end items-end h-auto">
  {#each activeChats as chat}
    <ChatWindow user={chat} open={chat.activeChat} />
  {/each}

</section>
