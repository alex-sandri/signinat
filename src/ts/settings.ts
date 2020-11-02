import { Api } from "./classes/Api";
import { Settings } from "./classes/Settings";

const createNewApp = document.getElementById("create-new-app") as HTMLButtonElement;

Api.Sessions.retrieve(Settings.get("session") as string).then(session =>
{
    createNewApp.addEventListener("click", async () =>
    {
        const createNewAppDialog = document.getElementById("create-new-app-dialog") as HTMLDialogElement;

        createNewAppDialog.show();

        const form = createNewAppDialog.querySelector("form") as HTMLFormElement;

        const nameInput = form.querySelector("#app-name") as HTMLInputElement;
        const urlInput = form.querySelector("#app-url") as HTMLInputElement;

        const submitButton = form.querySelector("button[type=submit]") as HTMLButtonElement;

        form.onsubmit = async e =>
        {
            e.preventDefault();

            submitButton.disabled = true;

            [ nameInput, urlInput ].forEach(element => element.parentElement?.querySelector(".error")?.remove());

            const response = await Api.Apps.create({
                name: nameInput.value.trim(),
                url: urlInput.value.trim(),
            });

            if (!response.result.valid)
            {
                nameInput.insertAdjacentElement("afterend", Api.Elements.error(response.errors.name.error));

                urlInput.insertAdjacentElement("afterend", Api.Elements.error(response.errors.url.error));
            }
            else
            {
                form.reset();

                createNewAppDialog.hidden = true;
            }

            submitButton.disabled = false;
        };
    });
});