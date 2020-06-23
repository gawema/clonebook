<script>
  import { Router, Route, Link } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import Login from "./pages/Login.svelte";
  export let url = ""; //This property is necessary declare to avoid ignore the Router
</script>

<Router url="{url}">
 <nav>
    <Link to="/">Home</Link>
    <Link to="/login">About</Link>
  </nav>
  <div>
    <Route path="/login" component="{Login}" /> 
    <!--for now the router just support case sensitive,
        one workaround colud be add two time the route
        Example.
       <Route path="About" component="{About}" /> 
    -->
    <Route path="/"><Home /></Route>
  </div>
</Router>