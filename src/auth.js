export async function login(data){
	const res = await fetch("http://localhost:3000/users/login", {
		method: "POST",
		body: JSON.stringify(Object.fromEntries(data)),
		headers: {
			'Content-Type': 'application/json'
		  },
		});
	const json = await res.json();
	return json;
}