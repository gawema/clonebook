<script>
	import CreatePost from '../components/CreatePost.svelte'
	import Post from '../components/Post.svelte'
	import CreatePostModal from '../components/CreatePostModal.svelte'

	export let posts;

	let showModal = false;

	let toggleModal = () => {
		showModal = !showModal;
	};
	
	let addPost = (event) => {
		const newPost = event.detail;
		posts = [newPost, ...posts]
		showModal = false
	}


</script>


<!-- ########################################## -->
<section>
	<CreatePostModal {showModal} on:click={toggleModal} on:submit={addPost}/>
	<CreatePost on:click={toggleModal}/>
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