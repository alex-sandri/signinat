import { Api } from "./classes/Api";

const form = document.querySelector("form") as HTMLFormElement;

const submitButton = form.querySelector("button[type=submit]") as HTMLButtonElement;

form.addEventListener("submit", async e =>
{
    e.preventDefault();

    submitButton.disabled = true;

    const formData = new FormData(form);

    const response = await Api.Sessions.create({
        email: (formData.get("email") as string).trim(),
        password: formData.get("password") as string,
    });

    console.log(response);

    submitButton.disabled = false;
});