import "./app.pcss";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";

import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
