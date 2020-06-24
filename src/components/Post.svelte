<script>

	import { onMount } from "svelte";
	import { profile_store, posts_store } from "../store.js";
	import FriendThumbnail from "./FriendThumbnail.svelte"
	export let post;

	let like = false;
	let ownLike = false;

	onMount(() => {
		like = false;
		countLikes();
	});

	const countLikes = async () => {
		console.log('checking likes');
	};

	const likePost = async () => {
		console.log('like pressed');
	};

	const deletePost = async () => {
		console.log("delete post");
	};
</script>



<!-- ########################################## -->

<div class="post">
	<div class="postItem w-full mb-6 bg-white">
		<div>
			<div class="relative postHeader grid p-2">
				<div class="flex cursor-pointer items-center justify-center" on:click={() => (window.location.href = `profile/`)}>
					<FriendThumbnail id={1}/>
				</div>
				<div>
					<p>Gabriele Mannucci</p>
					<p class="text-gray-600 font-medium text-sm">Just Now</p>
				</div>
			</div>
			<div class="mx-6 my-2 font-medium">
				<p>{post.text}</p>
			</div>
		</div>

		<div class="flex justify-center w-full">
			{#if post.photo}
				<img src={post.photo} alt="Post" />
			{/if}
		</div>

		<div class="postActions">
			<div class="postStatusContainer grid grid-cols-2">
				<div class="flex items-center">
					<img class="w-5 m-1" src="../svg/like.svg" alt="like" />
					<p class="m-1 text-gray-700 font-medium"> {post.likes} </p>
				</div>
			</div>

			<div class="actionContainer text-gray-600 grid grid-cols-3 h-12">
				<div class="actionTab likeBtn" on:click={likePost}>
					<i class="far fa-thumbs-up" style={ownLike ? 'color: #2078f4' : 'color: #718096'} />
					<p style={ownLike ? 'color: #2078f4' : 'color: #718096'} class="p-1"> Like </p>
				</div>
				<div class="actionTab">
					<i class="far fa-comment-alt" />
					<p class="p-1" on:click={() => { document.querySelector('#commentInput').focus(); }}> Comment </p>
				</div>
				<div class="actionTab">
					<i class="fas fa-share-square" />
					<p class="p-1">Share</p>
				</div>
			</div>
		</div>
	</div>
</div>


<!-- ########################################## -->


<style>
	.post{
		width: 90%;
	}

	.postItem {
		border-radius: 20px;	
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	}
	.postHeader {
		grid-template-columns: 10fr 90fr;
	}

	.postStatusContainer {
		padding: 0.4rem 0.2rem;
		border-bottom: 1px solid rgba(128, 128, 128, 0.4);
	}

	.actionContainer .actionTab {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		border-radius: 0.5rem;
		margin: 0.3rem 0rem;
		transition: 0.1s ease;
	}

	.actionContainer .actionTab i {
		font-size: 1.1rem;
	}

	.actionTab:hover {
		background-color: rgba(101, 103, 107, 0.15);
	}

	.likeBtn:hover {
		color: #4080ff;
	}

	.postActions {
		margin: 0rem 1rem;
	}

	.editPostButton {
		right: 0.7rem;
		top: 0.3rem;
	}
</style>