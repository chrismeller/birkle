export interface RegisterUserRequest {
    readonly id: string;
    readonly firstname: string;
    readonly surname: string;
    readonly email: string;
    readonly password: string;
}