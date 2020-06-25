<script>
  import IconThumbnail from "./IconThumbnail.svelte";

  import { getRequest } from "./../utils/getRequest.js";
  import { profile } from "./../store.js";

  $: results = [];
  let showSearchResults = false;
  let bindSearchResults;


  const getData = async e => {

    let response = await getRequest("/users/search", {
      searchItem: e.target.value
    });
    setTimeout(() => {
      bindSearchResults.focus();
    }, 200);

    results = response.result;
  };
</script>

<style>
  div#searchResults {
    position: absolute;
    width: 100%;
    max-height: 20rem;
    background: white;
    color: #333;
    border-top: none;
    z-index: -1;
    margin-top: 1.8rem;
    outline: 0px;
  }

  div#searchContainer {
    width: 90%;
    position: relative;
    display: grid;
  }

  .searchItem {
    transition: 0.2s ease all;
  }

  .searchItem:hover {
    background: #f0f2f5;
  }
</style>

<div id="searchContainer">
  <form class="relative flex items-center">
    {#if showSearchResults}
      <i
        class="absolute cursor-pointer pl-6 fas fa-arrow-left"
        on:click={() => {
          showSearchResults = false;
        }} />
    {:else}
      <i class="absolute pl-6 fas fa-search" />
    {/if}
    <input
      class="pl-12 h-12 bg-gray-200"
      type="text"
      placeholder="Search"
      on:focus={e => {
        getData(e);
        showSearchResults = true;
      }}
      on:input={e => {
        getData(e);
        showSearchResults = true;
      }} />
  </form>
  {#if showSearchResults}
    <div
      id="searchResults"
      bind:this={bindSearchResults}
      class="rounded-lg pt-6 pb-4 px-2 shadow-lg"
      on:click={(showSearchResults = true)}
      tabindex="0"
      on:blur={() => {
        showSearchResults = false;
      }}>
      {#each results as result}
        <div
          class="searchItem px-1 py-2 flex rounded-md cursor-pointer
          items-center justify-start"
          on:click={() => {
            showSearchResults = true;
            location.href = `/profile/${result.username}`;
          }}>
          <IconThumbnail photoUrl={result.photo} width="2rem" />
          <p>{result.firstName} {result.lastName}</p>
        </div>
      {/each}
    </div>
  {/if}
</div>
