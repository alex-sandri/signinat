import { Api } from "./classes/Api";
import { Settings } from "./classes/Settings";

Api.Sessions.retrieve(Settings.get("session") as string).then(session =>
{
    console.log(session);
});