import { writable } from "svelte/store";
import { browser } from "$app/environment";
let list = writable([]);

if (browser) {
    try {
        let maybe_list = localStorage.getItem("list");

        list.set(JSON.parse(maybe_list || "[]"));
    } catch (_) {
        localStorage.setItem("list", "[]");
    }
}

list.subscribe((tasks) => {
    if (browser) localStorage.setItem("list", JSON.stringify(tasks));
});

export default list;
