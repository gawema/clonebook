<script>

	let searchResultsDisplay = "none";
	function showSearchResults() {
		searchResultsDisplay = "block"
	}
	function hideSearchResults() {
		searchResultsDisplay = "none"
	}
</script>

<!-- ########################### -->

<nav>
	<div> CloneBook </div>
	<div id="search-container">
		<form>
			<input type="text" 
			on:focus="{showSearchResults}"
			on:blur="{hideSearchResults}"
			>
		</form>
		<div id="search-results" style="display: {searchResultsDisplay}">
		</div>
	</div>
</nav>

<!-- ########################### -->

<style>
	nav{
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		padding: 0 5vw;
		width: 100%;
		height: 3rem;
		background-color: blue;
		color: white;
	}
	div#search-container{
		position: relative;
	}
	div#search-results{
		position: absolute;
		width: 100%;
		height: 25vh;
		background: white;
		color: #333;
		border: 0.1rem gray solid;
		border-top: none;
		padding: 0.2rem;
		margin-top: -0.6rem;
	}
	input{
		width: 100%;
	}
</style>