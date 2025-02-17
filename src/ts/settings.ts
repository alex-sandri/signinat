import { Api } from "./classes/Api";
import { Settings } from "./classes/Settings";

document.documentElement.setAttribute("data-section", "profile");

[ "profile", "developer" ].forEach(section =>
{
    if (location.hash.replace("#", "") === section)
    {
        document.documentElement.setAttribute("data-section", section);
    }

    (document.querySelector(`footer a[href="#${section}"]`) as HTMLAnchorElement).onclick = () =>
    {
        document.documentElement.setAttribute("data-section", section);
    };
});

const createNewApp = document.getElementById("create-new-app") as HTMLButtonElement;

Api.Sessions.retrieve(Settings.get("session") as string).then(session =>
{
    createNewApp.addEventListener("click", async () =>
    {
        const createNewAppDialog = document.getElementById("create-new-app-dialog") as HTMLDialogElement;

        createNewAppDialog.showModal();

        const form = createNewAppDialog.querySelector("form") as HTMLFormElement;

        const nameInput = form.querySelector("#app-name") as HTMLInputElement;
        const urlInput = form.querySelector("#app-url") as HTMLInputElement;

        const submitButton = form.querySelector("button[type=submit]") as HTMLButtonElement;
        const cancelButton = form.querySelector("button.cancel") as HTMLButtonElement;

        const close = () =>
        {
            form.reset();

            createNewAppDialog.close();
        }

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
                close();
            }

            submitButton.disabled = false;
        };

        cancelButton.onclick = close;
    });
});

Api.Apps.list().then(apps =>
{
    apps.forEach(app =>
    {
        console.log(app);
    });
});