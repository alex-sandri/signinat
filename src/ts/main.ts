import { Settings } from "./classes/Settings";

window.addEventListener("load", () => document.body.classList.add("loaded"));

if (!Settings.exists("session") && location.pathname.startsWith("/account"))
    location.href = "/";

document.documentElement.setAttribute("signed-in", Settings.exists("session").toString());