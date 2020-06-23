<script>
import { profile } from "./../store.js";
import {login} from "../auth.js"


  const onLogin = async e => {
    e.preventDefault();
    let data = new FormData(e.target);
	let response = await login(data)
    localStorage.setItem("token", response.token);
    location.href = `/`;
  };
</script>

<style>
	section {
		margin-top: 20vh
	}
	.wider {
		width: 318px
	}
</style>

<section class="flex items-center justify-center mx-10">
  <div class="grid gap-4 items-center justify-center">
    <div class="flex items-center justify-center wider">
		<div class="loginFormContainer max-w-md w-full mt-4 bg-white rounded-lg shadow p-4">
			<h2 class="ml-2 text-xl mb-2">Log in</h2>
			<form on:submit={e => onLogin(e)}>
			<div class="grid grid-cols-1">
				<input
					class="rounded-lg bg-gray-200 m-1 p-2"
					type="text"
					name="email"
					placeholder="Email" />
			</div>
			<div class="grid grid-cols-1">			
				<input
					class="rounded-lg bg-gray-200 m-1 p-2"
					type="password"
					name="password"
					placeholder="Password" />
			</div>
			<div class="relative">
				<span
				class="text-xs absolute right-0 text-gray-500 cursor-pointer
				hover:underline">
				Forgot password?
				</span>

			</div>
			<div class="grid mt-10 gap-1">
				<button
				type="submit"
				class="w-full bg-transparent hover:bg-blue-400 text-blue-500
				font-semibold hover:text-white py-1 px-4 border border-blue-400
				hover:border-transparent rounded">
				Log in
				</button>
				<div class="flex justify-center">
				<p class="text-xs text-gray-500">
					Not registered?
					<span
					class="cursor-pointer hover:underline"
					on:click={() => window.location.href = '/signup'}>
					Create an account!
					</span>
				</p>
				</div>

			</div>

			</form>
		</div>
    </div>
  </div>
</section>

  