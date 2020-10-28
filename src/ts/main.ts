import { Settings } from "./classes/Settings";

window.addEventListener("load", () => document.body.classList.add("loaded"));

if (!Settings.exists("session") && [ "/account", "/account/settings" ].includes(location.pathname))
    location.href = "/";