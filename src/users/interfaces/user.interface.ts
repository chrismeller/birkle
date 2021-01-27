export interface User {
    readonly id: string;
    readonly email: string;
    readonly firstname: string;
    readonly surname: string;
    readonly passwordHash: string;
    readonly passwordSalt: string;
    readonly createdAt: string;
    readonly verificationToken: string;
    readonly verificationTokenCreatedAt: string;
    readonly emailVerified: boolean;
    readonly emailVerifiedAt: string | null;
}