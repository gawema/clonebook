<script>
	export let post;
	import FriendThumbnail from "./FriendThumbnail.svelte"

</script>


<!-- ########################################## -->

<div class="post">
	<!-- <FriendThumbnail id='{post._id}'/> -->
	<h4>{post.text}</h4>
</div> 


<!-- ########################################## -->


<style>
	.post{
		width: 90%;
		height: 100px;
		background-color: white;
		border-radius: 30px;	
		margin: 20px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	}
</style>