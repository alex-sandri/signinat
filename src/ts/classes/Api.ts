import { Session } from "../../../api/src/models/Session";
import { ApiRequest } from "../../../api/src/typings/ApiRequest";
import { ApiResponse } from "../../../api/src/typings/ApiResponse";

export namespace Api
{
    const BASE_ENDPOINT = "http://localhost:3000/api";

    export class Elements
    {
        static error = (error: string): HTMLElement =>
        {
            const element = document.createElement("small");

            if (error.length === 0) return element;

            element.className = "error";

            const mark = document.createElement("mark");

            mark.innerText = `✖ ${error}`;

            element.appendChild(mark);

            return element;
        }

        static warning = (warning: string): HTMLElement =>
        {
            const element = document.createElement("small");

            if (warning.length === 0) return element;

            element.className = "warning";

            const mark = document.createElement("mark");

            mark.innerText = `⚠ ${warning}`;

            element.appendChild(mark);

            return element;
        }

        static suggestion = (suggestion: string): HTMLElement =>
        {
            const element = document.createElement("small");

            if (suggestion.length === 0) return element;

            element.className = "suggestion";

            const mark = document.createElement("mark");

            mark.innerText = `🛈 ${suggestion}`;

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

        static retrieve = async (id: string): Promise<Session> =>
        {
            const response = await fetch(`${Sessions.ENDPOINT}/${id}`);

            return response.json();
        }

        static delete = async (id: string): Promise<void> => { await fetch(`${Sessions.ENDPOINT}/${id}`, { method: "DELETE" }); }
    }
}