<script>
	import Nav from './Nav.svelte'
	import Timeline from './Timeline.svelte'
	import Left from './Left.svelte'
	import Right from './Right.svelte'
</script>

<!-- ########################### -->

<main>
	<Nav />
	<div>
		<Left />
		<Timeline />
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