<script>
  import {me} from "../store.js"
  //  allow to inject content to the variable
  // export let id
  // $: name = $me.friends.find( jFriend => jFriend.id == id ).name
  // $: status = $me.friends.find( jFriend=>jFriend.id==id ).status
</script>

<!-- ############################## -->

<section class="friend" style="border-color:'black'};">
<!-- <section class="friend" style="border-color:{status==1?'green':'black'};"> -->
  <!-- {name} -->
</section>

<!-- ############################## -->

<style>
		.friend{
    display: grid;
    justify-content: center;
    align-content: center;
    width: 2rem;
    height: 2rem;
    border: 2px solid black;
    border-radius: 50%;
  }
</style>