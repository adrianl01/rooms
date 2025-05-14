import "./src/comps/welcome.ts/index.js";
import "./src/comps/chat.ts/index.js";

import { Router } from "@vaadin/router";
const root = document.querySelector(".root");
const router = new Router(root);
router.setRoutes([
  { path: "/", component: "welc-el" },
  { path: "/chat", component: "chat-el" },
]);
