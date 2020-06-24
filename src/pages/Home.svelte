<script>
	import Nav from '../sections/Nav.svelte'
	import Timeline from '../sections/Timeline.svelte'
	import Left from '../sections/Left.svelte'
	import Right from '../sections/Right.svelte'
	import { onMount } from "svelte"
	import { profile_store } from "../store.js"
	import { posts_store } from "../store.js"
	import { getPosts, getProfile} from "../data.js"

	onMount(() => {
		storePosts();
		storeProfile();
	});

	async function storePosts() {
		$posts_store = await getPosts();
	}
	async function storeProfile() {
		$profile_store = await getProfile();
	}

</script>

<!-- ########################### -->

<main>
	<Nav />
	<div>{$profile_store.firstName} {$profile_store.lastName}</div>
	<div>
		<Left />
	{#if $posts_store}
		<Timeline posts={$posts_store}/>
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