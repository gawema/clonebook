
// GET ALL POSTS
export async function getPosts(){
	const res = await fetch("http://localhost:3000/posts", {
		method: "GET",
		headers: {
			Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InBob3RvIjoiLi4vLi4vc3RhdGljL3Byb2ZpbGUtZGVmYXVsdC5qcGciLCJzdGF0dXMiOjAsIm9wZW5DaGF0cyI6W10sIl9pZCI6IjVlZjIyMjg0ODY3N2FjYzZlM2MxMzZiOCIsImZpcnN0TmFtZSI6InJvb3QiLCJsYXN0TmFtZSI6InJvb3QiLCJlbWFpbCI6InJvb3QiLCJwYXNzd29yZCI6IiQyYiQxMCRWN3FFRC83RDdQc2o0OC5zeWxCd2UuYU9pdVg3LmdtZjk5WlFBSFVZNzlVamJOd0pDcjlZVyIsInBvc3RzIjpbXSwiZnJpZW5kcyI6W10sIl9fdiI6MH0sImlhdCI6MTU5MjkyNjg2NX0.Leo3CaQaFHEVHRHBHnv3b0CrxvjA0aKjTPq2b7e2uVA",
		},
		});
	const json = await res.json();
	return json;
}