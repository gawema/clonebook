import { writable } from "svelte/store";


export let users = writable([]);

export let profile = writable({
  id: 1,
  firstName: "",
  lastName: "",
  photo: "",
  username: "",
  status: 0,
  public_json: {
    id: 0,
    firstName: "0",
    lastName: "0",
    photo: "",
    status: 0,
    username: "",
  },
  posts: [],
  friends: [],
  activeChats: [],
  notifications: [],
});

export let storePosts = writable([]);

export let postModal = writable({
  show: false,
  postData: undefined,
});
