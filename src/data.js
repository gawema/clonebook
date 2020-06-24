
// GET ALL POSTS
export async function getPosts(){
	const res = await fetch("http://localhost:3000/posts", {
		method: "GET",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("token")
		},
		});
	const json = await res.json();
	return json;
}

export async function getProfile(){
	const res = await fetch("http://localhost:3000/users/profile", {
		method: "GET",
		headers: {
			Authorization:  "Bearer " + localStorage.getItem("token")
		},
		});
	const json = await res.json();
	return json;
}