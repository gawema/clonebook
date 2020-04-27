<script>
let txtSearch = "";
let ajUsers = []
let boxSearchResultsDisplay = "none";
function showSearchResults() {
    boxSearchResultsDisplay = "grid";
}
function hideSearchResults(){
    boxSearchResultsDisplay = "none";
}
    
// Async - because it will take time to get the data
async function getUsers(){
    ajUsers = []
    // AWAIT So it wont go though before it has the data - because it will take time
    let connection = await fetch("http://localhost:88/users?searchFor="+txtSearch);
    let data = await connection.json()
    // Put it into the array
    ajUsers = data;
    // Calling the showSearchResults function, to show the searchcontainer
    showSearchResults()
    // Shows what we search for in the console
    console.log(data)
    
 }
</script>


<!-- ########################################## -->

<nav>
  <!-- <div>C</div>
  <div class="searchContainer">
    <form>
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Seach on Clonebook ..." bind:value="{txtSearch}" on:input="{getUsers}" on:focus="{getUsers}" on:blur="{hideSearchResults}">
    </form>
    <div style="display: {boxSearchResultsDisplay}" class="searchResultsContainer">
        {#each ajUsers as jUser }
            <div>{jUser.name} {jUser.lastName}</div>
        {/each }
    </div>
  </div>
        <div>Louise</div>
        <div>Home</div>
        <div>Create</div>
  <div><i class="fas fa-user-friends"></i></div>
  <div><i class="far fa-comment-alt"></i></div>
  <div><i class="far fa-bell"></i></div>
  <div><i class="far fa-question-circle"></i></div>
  <div><i class="fas fa-sort-down"></i></div> -->



  <div class="navC1">
    <div>Clonebook</div>
    <div class="searchContainer">
    <form>
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Seach on Clonebook ..." bind:value="{txtSearch}" on:input="{getUsers}" on:focus="{getUsers}" on:blur="{hideSearchResults}">
    </form>

    <div style="display: {boxSearchResultsDisplay}" class="searchResultsContainer">
        {#each ajUsers as jUser }
            <div>{jUser.name} {jUser.lastName}</div>
        {/each }
    </div>
  </div>
  </div> 
  <div class="navC2">
    <i class="fas fa-house-user"></i>
    <i class="far fa-flag"></i>
    <i class="far fa-play-circle"></i>
    <i class="fas fa-shopping-basket"></i>
    <i class="fas fa-users"></i>
  </div>
  <div class="navC3">
    <i class="fas fa-plus"></i>
    <i class="far fa-comment-alt"></i>
    <i class="far fa-bell"></i>
    <i class="fas fa-sort-down"></i>
  </div>

</nav> 


<!-- ########################################## -->


<style>
    nav {
        display: grid;
        /* grid-template-columns: 5fr 20fr 10fr 10fr 10fr 2fr 2fr 2fr 2fr 3fr; */
        grid-template-columns: 10fr 20fr 10fr;
        grid-gap: 0.2rem;
        align-items: center;
        
        width: 100%;
        height: 4rem;
        padding: 0px 0.5rem;
        color: black;
        background: white;
        /* background: #4267b2; */
        box-shadow: 0 1px 7px rgba(155, 155, 155, 0.12), 0 1px 2px rgba(155, 155, 155, 0.12);
    }
    .navC1 {
        display: grid;
        grid-template-columns: 1fr 5fr;
    }
    .navC2 {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            max-width: 400px;
            margin: 0 auto;
            grid-gap: 50px;
    }
    .navC3 {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    }
    nav form i {
        position: absolute;
        top: 8px;
        left: 11px;
    }
    nav form input {
        padding-left: 33px;
        height: 35px;
    }
    nav div.searchContainer {
        position: relative;
    }
    nav div.searchResultsContainer {
        position: absolute;
        width: 100%;
        height: 10rem;
        background: white;
        color: #333;
        border: 1px solid #999;
        border-top: none;
        padding: 0px 0.2rem;
        
    }
</style>