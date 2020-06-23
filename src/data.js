import {writable} from "svelte/store"
export let me = writable(
  {
    "name":"Gabriele",
    "lastName":"Mannucci",
    "friends":
    [
      {"id":111, "name":"A", "status":1},
      {"id":222, "name":"B", "status":0},
      {"id":333, "name":"C", "status":1},
    ]
  }
)