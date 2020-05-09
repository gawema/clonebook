<script>
</script>


<!-- ########################################## -->

<createPost>
	<div class="pic"></div>
	<div class="input">
		<input type="text" placeholder="What's on your mind, Gabriele?">
	</div>
	<div class="line"></div>
	<div class="media">
		<i class="fa fa-file-image-o"></i>
		Photo/Video
	</div>
	<div class="tag">
		<i class="fas fa-user-tag"></i>
		Tag Friend
	</div>
	<div class="feeling">
		<i class="fas fa-shoe-prints"></i>
		Feeling/Activity
	</div>
</createPost> 


<!-- ########################################## -->


<style>

	createPost {
		width: 90%;
		background-color: white;
		border-radius: 20px;	
		margin: 20px;
		padding: 1.3rem;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ;
		grid-template-areas: 
			"pic input input input input input input input"
			"line line line line line line line line"
			"media media . tag tag . feeling feeling";
		grid-row-gap: 1rem;
	}
	.pic {
		grid-area: pic;
		border-radius: 50px;
		background-color: #4fcfc5;
		height: 40px;
		width: 40px;
		text-align: center
	}
	.input {
		grid-area: input;
	}
	.input input {
		height: 40px;
		padding-left: 2rem;
	}
	.line {
		grid-area: line;
		border-top: 1px #e4e6eb solid;
		margin: 0 5px;
	}
	.media, .tag, .feeling {
		font-size: 1.2rem;
	}
	.media, .tag, .feeling {
		color: #555;
		font-size: 0.9rem;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}
	i {
		font-size: 1.7rem;
	}
	.media {
		grid-area: media;
	}
	.media i {
		color: #45bd62;
	}
	.tag {
		grid-area: tag;
	}
	.tag i {
		color: #1877f2;
	}
	.feeling {
		grid-area: feeling;
	}
	.feeling i {
		color: #f7b929
	}

</style>