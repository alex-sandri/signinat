import { Api } from "./classes/Api";
import { Settings } from "./classes/Settings";

Api.Sessions.retrieve(Settings.get("session") as string).then(session =>
{
    (document.querySelector("#first-name .value") as HTMLElement).innerText = session.user.firstName;
    (document.querySelector("#last-name .value") as HTMLElement).innerText = session.user.lastName;
    (document.querySelector("#email .value") as HTMLElement).innerText = session.user.email;
});