  <script>
  import IconThumbnail from "../components/IconThumbnail.svelte";
  import { profile, postModal } from "../store.js";

  const onOpenModal = () => {
    $postModal.show = true;
  };
</script>

<style>
  	createPost {
		width: 100%;
		background-color: white;
		border-radius: 20px;	
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
		background: #f0f2f5;
		color: #64666b;
		border-radius: 30px;
		height: 40px;
		padding-left: 2rem;
		padding-top: 10px;
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
  

  <createPost>
	<div class="pic">
	    <IconThumbnail photoUrl={$profile.photo} />
	</div>
	<div class="input" on:click={onOpenModal}> What's on your mind, {$profile.firstName}?</div>
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