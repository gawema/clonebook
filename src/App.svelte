<script>
  import { Router, Route, Link } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import Login from "./pages/Login.svelte";
  import Signup from "./pages/Signup.svelte";
  export let url = ""; //This property is necessary declare to avoid ignore the Router
</script>

<Router url="{url}">
  <div>
    <Route path="/login" component="{Login}" /> 
    <Route path="/signup" component="{Signup}" /> 
    <Route path="/"><Home /></Route>
  </div>
</Router>