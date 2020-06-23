<script>
	import Nav from './sections/Nav.svelte'
	import Timeline from './sections/Timeline.svelte'
	import Left from './sections/Left.svelte'
	import Right from './sections/Right.svelte'
	import { onMount } from "svelte"
	import {me} from "./store.js"
	import {post_store} from "./store.js"
	import {getPosts} from "./data.js"


	let posts = [];
	onMount(() => {
		storePosts();
	});

	async function storePosts() {
		$post_store = await getPosts();
	}
	
	post_store.subscribe(data => {
		posts = data;
	})

</script>

<!-- ########################### -->

<main>
	<Nav />
	<div>{$me.name} {$me.lastName}</div>
	<div>
		<Left />
	{#if posts}
		<Timeline posts={posts}/>
	{/if}
		<Right />
	</div>

</main>

<!-- ########################### -->

<style>
	div{
		display: grid;
		grid-template-columns: 10fr 20fr 10fr;
		grid-gap: 5rem;
		position: absolute;
		top: 5rem;
		left: 0px;
		width: 100%;
		height: 100%;
		padding: 0px 2vw;
	}
</style>