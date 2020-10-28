import { Session } from "../models/Session";
import { User } from "../models/User";

export namespace ApiResponse
{
    export namespace Users
    {
        export interface Create
        {
            result: {
                valid: boolean,
                data?: User,
            },
            errors: {
                name: {
                    first: {
                        error: string,
                    },
                    last: {
                        error: string,
                    },
                },
                email: {
                    error: string,
                },
                password: {
                    error: string,
                },
            },
        }
    }

    export namespace Sessions
    {
        export interface Create
        {
            result: {
                valid: boolean,
                data?: Session,
            },
            errors: {
                email: {
                    error: string,
                },
                password: {
                    error: string,
                },
            },
        }
    }
}