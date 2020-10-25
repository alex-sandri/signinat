import { ApiRequest } from "../../../api/src/typings/ApiRequest";
import { ApiResponse } from "../../../api/src/typings/ApiResponse";

export namespace Api
{
    const BASE_ENDPOINT = "http://localhost:3000/api";

    export class Elements
    {
        static error = (error: string) =>
        {
            const element = document.createElement("small");

            element.className = "error";

            const mark = document.createElement("mark");

            mark.innerText = `✖ ${error}`;

            element.appendChild(mark);

            return element;
        }
    }

    export class Users
    {
        static readonly ENDPOINT = `${BASE_ENDPOINT}/users`;

        static create = async (data: ApiRequest.Users.Create): Promise<ApiResponse.Users.Create> =>
        {
            const response = await fetch(Users.ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            return response.json();
        }
    }

    export class Sessions
    {
        static readonly ENDPOINT = `${BASE_ENDPOINT}/sessions`;

        static create = async (data: ApiRequest.Sessions.Create): Promise<ApiResponse.Sessions.Create> =>
        {
            const response = await fetch(Sessions.ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            return response.json();
        }
    }
}