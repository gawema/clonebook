<script>
  import LoginForm from "../components/LoginForm.svelte";

  import { checkSession } from "./../utils/checkSession.js";
  import { onMount } from "svelte";

  onMount(() => {
    checkSession();
  });
</script>

<style>
</style>

<svelte:head>
	<title>Login into Sveltebook</title>
</svelte:head>

<section class="flex items-center justify-center mx-10">
  <div class="grid gap-4 items-center justify-center">
    <div class="flex items-center justify-center">
      <LoginForm />
    </div>
  </div>
</section>
