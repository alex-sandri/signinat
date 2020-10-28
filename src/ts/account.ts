import { Api } from "./classes/Api";
import { Settings } from "./classes/Settings";

const signOutButton = document.querySelector("#sign-out") as HTMLButtonElement;

signOutButton.addEventListener("click", async () =>
{
    await Api.Sessions.delete(/* TODO */);

    Settings.delete("session");

    location.href = "/";
});

Api.Sessions.retrieve(Settings.get("session")).then(session =>
{
    // TODO
});