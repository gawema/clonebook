<script>
	import {me} from "./data.js"
	import FriendThumbnail from "./FriendThumbnail.svelte"
</script>

<!-- ############################## -->

<section>
	<h1>Friends List</h1>
	{#each $me.friends as jFriend}
	<FriendThumbnail id={jFriend.id} />
	{/each}
</section>

<!-- ############################## -->

<style>

	section {
		will-change: 100%;
		height: 100%;
		background-color: antiquewhite
	}
</style>