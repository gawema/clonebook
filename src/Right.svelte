<script>

	// Friends = many = array
	// not global... only visible in this component
	// get some friends from mongodb... 

	// mmm... how about when we click on a friend?
	// what will happen? what should show? where?
	// don't know how to do all that, so at least I do what I know... the click
	let ajFriends = [
		{"_id":"5e9edd3636b92723a03e06ef","name":"A","lastName":"AA"},
		{"_id":"5ea15c9ba266660db4ead82c","name":"B","lastName":"BB"},
		{"_id":"5ea15ca5a266660db4ead82d","name":"C","lastName":"CC"}
	]
	// I don't have that funtion showChatWindow, so I create it
	const showChatWindow = () => {
		// quick test... console.log
		console.log("showing chat window")
	}

</script>

<!-- ############################## -->

<section>
	{#each ajFriends as jFriend}
		<div class="friend" on:click="{showChatWindow}">:) {jFriend.name} {jFriend.lastName}</div>
	{/each}
</section>

<!-- ############################## -->

<style>
	section{
		position: fixed;
		top: 0px;
		right: 0px;
		width: 15rem;
		height: 100%;
		background: gray;
	}
	/* ugly - should show a nice hand so users know that they have to click */
	div.friend{
		cursor: pointer;
	}
</style>