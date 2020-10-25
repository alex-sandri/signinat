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
        // TODO
    }

    console.log(response);

    submitButton.disabled = false;
});