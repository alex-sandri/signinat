export class ApiError
{
    public readonly message: string;

    constructor(public id: string)
    {
        switch (id)
        {
            case "user/name/first/empty": this.message = "This field cannot be empty"; break;

            case "user/name/last/empty": this.message = "This field cannot be empty"; break;

            case "user/email/empty": this.message = "This field cannot be empty"; break;
            case "user/email/already-exists": this.message = "A user with this email already exists"; break;
            case "user/email/inexistent": this.message = "A user with this email does not exist"; break;

            case "user/password/empty": this.message = "This field cannot be empty"; break;
            case "user/password/weak": this.message = "Please enter a stronger password"; break;
            case "user/password/wrong": this.message = "Wrong password"; break;

            default: this.message = "Unknown error"; break;
        }
    }
}