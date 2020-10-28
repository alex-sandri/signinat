import { Api } from "./classes/Api";
import { Settings } from "./classes/Settings";

window.addEventListener("load", () => document.body.classList.add("loaded"));

if (!Settings.exists("session") && location.pathname.startsWith("/account"))
    location.href = "/";

if (Settings.exists("session"))
{
    Api.Sessions.retrieve(Settings.get("session") as string).then(session =>
    {
        document.querySelectorAll<HTMLElement>(".first-name").forEach(element => element.innerText = session.user.firstName);
        document.querySelectorAll<HTMLElement>(".last-name").forEach(element => element.innerText = session.user.lastName);
        document.querySelectorAll<HTMLElement>(".email").forEach(element => element.innerText = session.user.email);
    });
}

document.documentElement.setAttribute("signed-in", Settings.exists("session").toString());

const accountMenuContainer = document.getElementById("account-menu-container") as HTMLElement;

document.querySelector("#open-account-menu")?.addEventListener("click", () => { accountMenuContainer.style.display = "block"; });

accountMenuContainer?.addEventListener("click", e =>
{
    if (e.target === accountMenuContainer) accountMenuContainer.style.display = "none";
});

document.querySelector("#sign-out")?.addEventListener("click", async () =>
{
    await Api.Sessions.delete(Settings.get("session") as string);

    Settings.delete("session");

    location.href = "/";
});