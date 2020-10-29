import * as zxcvbn from "zxcvbn";

import { Api } from "./classes/Api";

const userForm = document.querySelector("form[data-for-account-type=user]") as HTMLFormElement;
const appForm = document.querySelector("form[data-for-account-type=app]") as HTMLFormElement;

const accountTypeRadioButtons = document.querySelectorAll<HTMLInputElement>("#account-type-choice input[type=radio]");

const firstNameInput = userForm.querySelector("#first-name") as HTMLInputElement;
const lastNameInput = userForm.querySelector("#last-name") as HTMLInputElement;
const emailInput = userForm.querySelector("#email") as HTMLInputElement;
const passwordInput = userForm.querySelector("#password") as HTMLInputElement;

const appNameInput = appForm.querySelector("#app-name") as HTMLInputElement;
const appUrlInput = appForm.querySelector("#app-url") as HTMLInputElement;
const appEmailInput = appForm.querySelector("#app-email") as HTMLInputElement;
const appPasswordInput = appForm.querySelector("#app-password") as HTMLInputElement;

const userFormSubmitButton = userForm.querySelector("button[type=submit]") as HTMLButtonElement;
const appFormSubmitButton = appForm.querySelector("button[type=submit]") as HTMLButtonElement;

accountTypeRadioButtons.forEach(radioButton => radioButton.addEventListener("change", e =>
{
    const accountType = (e.target as HTMLInputElement).getAttribute("data-account-type") as string;

    document.querySelectorAll<HTMLElement>(`[data-for-account-type]`).forEach(element => element.style.display = "none");

    (document.querySelector(`[data-for-account-type=${accountType}]`) as HTMLElement).style.display = "block";
}));

[ passwordInput, appPasswordInput ].forEach(element => element.addEventListener("input", e =>
{
    const zxcvbnResult = zxcvbn(passwordInput.value);

    passwordInput.parentElement?.querySelectorAll(".warning, .suggestion").forEach(element => element.remove());

    passwordInput.insertAdjacentElement("afterend", Api.Elements.warning(zxcvbnResult.feedback.warning));

    zxcvbnResult.feedback.suggestions.forEach(suggestion =>
    {
        passwordInput.insertAdjacentElement("afterend", Api.Elements.suggestion(suggestion));
    });
}));

userForm.addEventListener("submit", async e =>
{
    e.preventDefault();

    userFormSubmitButton.disabled = true;

    [ firstNameInput, lastNameInput, emailInput, passwordInput ].forEach(element => element.parentElement?.querySelector(".error")?.remove());

    const response = await Api.Users.create({
        name: {
            first: firstNameInput.value.trim(),
            last: lastNameInput.value.trim(),
        },
        email: emailInput.value.trim(),
        password: passwordInput.value,
    });

    if (!response.result.valid)
    {
        firstNameInput.insertAdjacentElement("afterend", Api.Elements.error(response.errors.name.first.error));

        lastNameInput.insertAdjacentElement("afterend", Api.Elements.error(response.errors.name.last.error));

        emailInput.insertAdjacentElement("afterend", Api.Elements.error(response.errors.email.error));

        passwordInput.insertAdjacentElement("afterend", Api.Elements.error(response.errors.password.error));
    }
    else
    {
        userForm.reset();
    }

    userFormSubmitButton.disabled = false;
});

appForm.addEventListener("submit", async e =>
{
    e.preventDefault();

    appFormSubmitButton.disabled = true;

    [ appNameInput, appUrlInput, appEmailInput, appPasswordInput ].forEach(element => element.parentElement?.querySelector(".error")?.remove());

    const response = await Api.Apps.create({
        name: appNameInput.value.trim(),
        url: appUrlInput.value.trim(),
        email: emailInput.value.trim(),
        password: appPasswordInput.value,
    });

    if (!response.result.valid)
    {
        appNameInput.insertAdjacentElement("afterend", Api.Elements.error(response.errors.name.error));

        appUrlInput.insertAdjacentElement("afterend", Api.Elements.error(response.errors.url.error));

        appEmailInput.insertAdjacentElement("afterend", Api.Elements.error(response.errors.email.error));

        appPasswordInput.insertAdjacentElement("afterend", Api.Elements.error(response.errors.password.error));
    }
    else
    {
        appForm.reset();
    }

    appFormSubmitButton.disabled = false;
});