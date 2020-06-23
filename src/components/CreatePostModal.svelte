<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let showModal = false;

	let newPostText;

	function createPost() {
		dispatch('submit', {
			text: newPostText
		});
		newPostText = '';
	}
</script>

{#if showModal}
	<div class="backdrop" on:click|self>
		<div class="modal">
    		<form on:submit|preventDefault={createPost}>
				<input type="text" bind:value={newPostText} required>
				<button>Add Post</button>
			</form>
		</div>
	</div>
{/if}

<style>
	.backdrop{
		width: 100%;
		height: 100%;
		position: fixed;
		background: rgba(0,0,0,0.2);
	}
	.modal{
		padding: 10px;
		border-radius: 10px;
		max-width: 400px;
		margin: 10% auto;;
		text-align: center;
		background: white;
	}

</style>