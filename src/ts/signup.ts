import { Api } from "./classes/Api";

const form = document.querySelector("form") as HTMLFormElement;

const firstNameInput = form.querySelector("#first-name") as HTMLInputElement;
const lastNameInput = form.querySelector("#last-name") as HTMLInputElement;
const emailInput = form.querySelector("#email") as HTMLInputElement;
const passwordInput = form.querySelector("#password") as HTMLInputElement;

const submitButton = form.querySelector("button[type=submit]") as HTMLButtonElement;

form.addEventListener("submit", async e =>
{
    e.preventDefault();

    submitButton.disabled = true;

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

    console.log(response);

    submitButton.disabled = false;
});