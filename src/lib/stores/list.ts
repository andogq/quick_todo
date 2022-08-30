export type Task = {
    id: number,
    title: string,
    done: boolean
}
function is_task(maybe_task: any): maybe_task is Task {
    return (
        typeof maybe_task === "object" &&
        typeof maybe_task.title === "string" &&
        typeof maybe_task.done === "boolean"
    );
}

type Subscription = (tasks: Task[]) => void;

const LOCAL_STORAGE_KEY = "list";

let subscriptions: (Subscription | null)[] = [];
let tasks: Task[] = [];

function load_from_store() {
    try {
        let maybe_tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");

        tasks = maybe_tasks.filter((task: any) => is_task(task));
    } catch (_) {
        console.error("Invalid format in local storage. Clearing");
    }
}

function save_to_store() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
}

load_from_store();

export default {
    subscribe: (subscription: Subscription) => {
        subscription([...tasks]);

        let i = subscriptions.push(subscription) - 1;

        return () => subscriptions[i] = null;
    },
    set: (new_tasks: Task[]) => {
        tasks = [...new_tasks];

        save_to_store();

        for (let subscription of subscriptions) {
            if (subscription) subscription([...tasks]);
        }
    }
}
