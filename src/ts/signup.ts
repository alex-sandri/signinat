import { Api } from "./classes/Api";

const form = document.querySelector("form") as HTMLFormElement;

const firstNameInput = form.querySelector("#first-name") as HTMLInputElement;
const lastNameInput = form.querySelector("#last-name") as HTMLInputElement;
const emailInput = form.querySelector("#email") as HTMLInputElement;
const passwordInput = form.querySelector("#password") as HTMLInputElement;

const submitButton = form.querySelector("button[type=submit]") as HTMLButtonElement;

submitButton.disabled = true;

const getFormInputValues = () => ({
    name: {
        first: firstNameInput.value.trim(),
        last: lastNameInput.value.trim(),
    },
    email: emailInput.value.trim(),
    password: passwordInput.value,
});

form.addEventListener("input", e =>
{
    const formInputValues = getFormInputValues();

    const errors = {
        "first-name": "",
        "last-name": "",
        "email": "",
        "password": "",
    };

    if (formInputValues.name.first.length === 0)
    {
        errors["first-name"] = "empty";
    }

    if (formInputValues.name.last.length === 0)
    {
        errors["last-name"] = "empty";
    }

    if (formInputValues.email.length === 0)
    {
        errors.email = "empty";
    }

    if (formInputValues.password.length === 0)
    {
        errors.password = "empty";
    }

    submitButton.disabled = Object.values(errors).some(error => error.length > 0);
});

form.addEventListener("submit", async e =>
{
    e.preventDefault();

    const response = await Api.Users.create(getFormInputValues());

    console.log(response);
});