import "./app.css";
import App from "./App.svelte";
import data from "./test.json";

console.log(data);

const app = new App({
  target: document.getElementById("app"),
});

export default app;
