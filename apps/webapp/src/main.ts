import "@/styles/index.css";
import Router from "@/Router.svelte";

const target = document.getElementById("root");
if (target) new Router({ target });
