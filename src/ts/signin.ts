import { Session } from "../../api/src/models/Session";
import { Api } from "./classes/Api";
import { Settings } from "./classes/Settings";

const form = document.querySelector("form") as HTMLFormElement;

const emailInput = form.querySelector("#email") as HTMLInputElement;
const passwordInput = form.querySelector("#password") as HTMLInputElement;

const submitButton = form.querySelector("button[type=submit]") as HTMLButtonElement;

form.addEventListener("submit", async e =>
{
    e.preventDefault();

    submitButton.disabled = true;

    [ emailInput, passwordInput ].forEach(element => element.parentElement?.querySelector(".error")?.remove());

    const response = await Api.Sessions.create({
        email: emailInput.value.trim(),
        password: passwordInput.value,
    });

    if (!response.result.valid)
    {
        emailInput.insertAdjacentElement("afterend", Api.Elements.error(response.errors.email.error));

        passwordInput.insertAdjacentElement("afterend", Api.Elements.error(response.errors.password.error));
    }
    else
    {
        Settings.set("session", (response.result.data as Session).id);

        location.href = "/account";
    }

    submitButton.disabled = false;
});