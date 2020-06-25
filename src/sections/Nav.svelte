<script>
  import IconThumbnail from "../components/IconThumbnail.svelte";
  import SearchBar from "../components/SearchBar.svelte";
  import NavSocialIcons from "../components/NavSocialActions.svelte";
  export let segment;

  import { onMount } from "svelte";

  import { profile } from "../store.js";

  onMount(() => {
    if (!localStorage.getItem("token")) {
      showNav = false;
    }
  });

  let showNav = true;
</script>

<style>
    * {
        transition-duration: 0.2s;
    }
    nav {
        position: fixed;
        z-index: 1;
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
        background-color: #6075fb;
        color: white;
        font-size: 1.5rem;
        display: grid;
        justify-content: center;
        align-items: center;
        border-radius: 30px;
        height: 3.3rem;
        width: 3.3rem;
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
        background: #6075fb;
        border-radius: 2px 2px 0 0
    }

</style>

{#if showNav}
  <nav>
      <div class="nav left">
          <div class="icon">
                <a aria-current="{segment === undefined ? 'page' : undefined}" href=".">
                    <i class="fa fa-facebook" aria-hidden="true"></i>
                </a>
          </div>
          <SearchBar />
      </div> 
      <div class="nav center">
          <div class="tab">
              <div class="hovertab">
                 <a href=".">
                    <i class="fas fa-house-user" style="color: {segment === undefined ? '#6075fb' : 'rgb(128, 128, 128)'}" ></i>     
                </a>       
              </div>
              <div class="active" style="opacity: {segment === undefined ? '1' : '0'}"></div>
          </div>
          <div class="tab">
              <div class="hovertab">
                <a href="/marketplace">
                  <i class="fas fa-shopping-basket" style="color: {segment === 'marketplace' ? '#6075fb' : 'rgb(128, 128, 128)'}"></i>
                </a>
              </div>
              <div class="active" style="opacity: {segment === 'marketplace' ? '1' : '0'}"></div></div>
          <div class="tab">
              <div class="hovertab">
                <a href="/groups">
                  <i class="fas fa-users" style="color: {segment === 'groups' ? '#6075fb' : 'rgb(128, 128, 128)'}"></i>
                </a>
              </div>
              <div class="active" style="opacity: {segment === 'groups' ? '1' : '0'}"></div>
          </div>
      </div>
      <div class="center grid gap-4">
        <div class="flex items-center justify-center">
          <a href={'/profilepage'}>
            <div class="profileIcon grid grid-cols-2 gap-2 rounded-full p-2 cursor-pointer">
              <div class="flex items-center justify-center flex-center">
                <IconThumbnail photoUrl={$profile.photo} width="2.5rem" />
              </div>
              <div class="flex items-center justify-center flex-center">
                <p>{$profile.firstName}</p>
              </div>
            </div>
          </a>
        </div>
        <div>
          <NavSocialIcons />
        </div>
      </div>
  </nav> 
{/if}



