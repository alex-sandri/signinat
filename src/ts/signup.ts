import { Api } from "./classes/Api";

const form = document.querySelector("form") as HTMLFormElement;

form.addEventListener("submit", async e =>
{
    e.preventDefault();

    const formData = new FormData(form);

    const response = await Api.Users.create({
        name: {
            first: (formData.get("first-name") as string).trim(),
            last: (formData.get("last-name") as string).trim(),
        },
        email: (formData.get("email") as string).trim(),
        password: formData.get("password") as string,
    });

    console.log(response);
});