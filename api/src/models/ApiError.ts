export class ApiError
{
    public readonly message: string;

    constructor(public id: string)
    {
        switch (id)
        {
            case "user/name/first/empty": this.message = "empty"; break;

            case "user/name/last/empty": this.message = "empty"; break;

            case "user/email/empty": this.message = "empty"; break;
            case "user/email/already-exists": this.message = "already-exists"; break;
            case "user/email/inexistent": this.message = "inexistent"; break;

            case "user/password/empty": this.message = "empty"; break;
            case "user/password/weak": this.message = "weak"; break;
            case "user/password/wrong": this.message = "wrong"; break;

            default: this.message = "Unknown error"; break;
        }
    }
}