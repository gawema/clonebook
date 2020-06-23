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
    <div class="nav left">
        <div class="icon">
            <i class="fa fa-facebook" aria-hidden="true"></i>
        </div>
        <div class="searchbar">
            <form>
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Seach on Clonebook ..." bind:value="{txtSearch}" on:input="{getUsers}" on:focus="{getUsers}" on:blur="{hideSearchResults}">
            </form>
            <div style="display: {boxSearchResultsDisplay}" class="results">
                {#each ajUsers as jUser }
                    <div>{jUser.name} {jUser.lastName}</div>
                {/each }
            </div>
        </div>
    </div> 
    <div class="nav center">
        <div class="tab">
            <div class="hovertab">
                <i class="fas fa-house-user"style="color: rgb(79, 207, 197);"></i>            
            </div>
            <div class="active" style="opacity: 1"></div>
        </div>
        <div class="tab">
            <div class="hovertab">
                <i class="fas fa-shopping-basket" style="color: rgb(128, 128, 128)"></i>
            </div>
            <div class="active" style="opacity: 0"></div></div>
        <div class="tab">
            <div class="hovertab">
                <i class="fas fa-users" style="color: rgb(128, 128, 128)"></i>
            </div>
            <div class="active" style="opacity: 0"></div>
        </div>
    </div>
    <div class="nav right"> 
        <div>
            <i class="fas fa-plus"></i>
        </div>
        <div>
            <i class="far fa-comment-alt"></i>
        </div>
        <div>
            <i class="far fa-bell"></i>
        </div>
        <div>
            <i class="fa fa-user-circle-o" aria-hidden="true"></i>
        </div>
    </div>
</nav> 


<!-- ########################################## -->


<style>
    * {
        transition-duration: 0.2s;
    }
    nav {
        display: grid;
        grid-template-columns: 10fr 20fr 10fr;
        grid-gap: 0.2rem;
        align-items: center;
        width: 100%;
        min-height: 5rem;
        padding: 0 0.5rem;
        color: #333;
        background: white;
        box-shadow: 0 1px 7px rgba(143, 143, 143, 0.12)
    }
    nav div {
        display: grid;
        align-items: center;
        justify-content: center;
        justify-items: center;
    }
    .left {
        grid-template-columns: 1fr 5fr;
        grid-gap: 0.5rem
    }
    .left .icon {
        background-color: rgb(79, 207, 197);
        color: white;
        font-size: 1.5rem;
        display: grid;
        justify-content: center;
        align-items: center;
        border-radius: 30px;
        height: 3.3rem;
        width: 3.3rem;
    }
    .left .searchbar {
        width: 100%;
        justify-content: stretch;
    }
    .searchbar i {
        position: absolute;
        margin: 1.2rem;
        font-size: 1rem;
        color: rgb(138, 137, 137)
    }
    .searchbar input {
        padding-left: 4rem;
        height: 3.3rem;
    }
    .searchbar .results {
        position: absolute;
        width: 100%;
        height: 10rem;
        background: white;
        color: #333;
        border: 1px solid #999;
        border-top: none;
        padding: 0px 0.2rem;
        
    }
    .center {
        display: flex;
        justify-content: space-around;
        height: 100%;
    }
    .center .hovertab{
        margin-top: 20px;
        width: 45%;
        height: 90%;
        border-radius: 20%;
    }
    .center .hovertab:hover{
        background-color: #f3f3f3;
    }
    .center .tab {
        width: 100%;
        height: 100%;
        align-items: flex-end
    }
    .center .tab i {
        font-size: 1.5rem;
        color: rgb(128, 128, 128) 
    }
    .center .tab .active{
        height: 3px;
        width: 140px;
        background: rgb(79, 207, 197);
        border-radius: 2px 2px 0 0
    }
    .right {
        display: grid;
        grid-template-columns:  1fr 1fr 1fr 1fr;
        column-gap: 2rem;
        margin: 0 3rem 0 auto;
        font-size: 1.2rem;
        color: #333
    }
    .right div {
        height: 3rem;
        width: 3rem;
        background-color: rgb(212, 212, 212);
        border-radius: 30px;
    }
    .right div:hover {
        background-color: rgb(188, 188, 188);
    }
</style>