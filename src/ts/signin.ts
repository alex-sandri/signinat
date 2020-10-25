import { Api } from "./classes/Api";

const form = document.querySelector("form") as HTMLFormElement;

form.addEventListener("submit", async e =>
{
    e.preventDefault();

    const formData = new FormData(form);

    const response = await Api.Sessions.create({
        email: (formData.get("email") as string).trim(),
        password: formData.get("password") as string,
    });

    console.log(response);
});