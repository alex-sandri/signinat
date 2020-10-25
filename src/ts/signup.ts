import { Api } from "./classes/Api";

const form = document.querySelector("form") as HTMLFormElement;

form.addEventListener("submit", async e =>
{
    e.preventDefault();

    const response = await Api.Users.create();

    console.log(response);
});