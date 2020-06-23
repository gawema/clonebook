<script>
	import CreatePost from './CreatePost.svelte'
	import Post from './Post.svelte'
	import CreatePostModal from './CreatePostModal.svelte'

	let showModal = false;

	let toggleModal = () => {
		showModal = !showModal;
	};

	let posts = [
		{
			text: 'ciao belli',
			friendId: 111
		},
		{
			text: 'ciao belli',
			friendId: 222
		},
		{
			text: 'ciao belli',
			friendId: 333
		},
		{
			text: 'ciao belli',
			friendId: 111
		}
	]
	
	let addPost = (event) => {
		const newPost = event.detail;
		posts = [newPost, ...posts]
		showModal = false
	}

</script>


<!-- ########################################## -->
<section>
	<CreatePostModal {showModal} on:click={toggleModal} on:submit={addPost}/>
	<CreatePost  on:click={toggleModal}/>
	{#each posts as post}
		<Post {post}/>
	{/each}
</section> 


<!-- ########################################## -->


<style>
	section{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>