import { Api } from "./classes/Api";
import { Settings } from "./classes/Settings";

window.addEventListener("load", () => document.body.classList.add("loaded"));

if (!Settings.exists("session") && location.pathname.startsWith("/account"))
    location.href = "/";

document.documentElement.setAttribute("signed-in", Settings.exists("session").toString());

const signOutButton = document.querySelector("#sign-out") as HTMLButtonElement;

signOutButton.addEventListener("click", async () =>
{
    await Api.Sessions.delete(Settings.get("session") as string);

    Settings.delete("session");

    location.href = "/";
});