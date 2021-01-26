import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
    constructor(private readonly db: DbService) {   
    }

    async getByEmail(email: string): Promise<User | null> {
        return await this.db.user.findUnique({
            where: {
                Email: email,
            }
        });
    }

    async getById(id: string) : Promise<User | null> {
        return await this.db.user.findUnique({
            where: {
                Id: id,
            }
        });
    }

    async create(id: string, email: string, firstname: string, surname: string, passwordHash: string, passwordSalt: string, verificationToken: string): Promise<User | null> {
        return await this.db.user.create({
            data: {
                Id: id,
                Email: email,
                FirstName: firstname,
                Surname: surname,
                PasswordHash: passwordHash,
                PasswordSalt: passwordSalt,
                VerificationToken: verificationToken,
            }
        });
    }

    async markEmailVerified(id: string, verifiedAt: Date) {
        return await this.db.user.update({
            data: {
                EmailVerifiedAt: verifiedAt,
            },
            where: {
                Id: id,
            }
        });
    }

    async updateVerificationToken(id: string, verificationToken: string) {
        return await this.db.user.update({
            data: {
                VerificationToken: verificationToken,
            },
            where: {
                Id: id,
            }
        });
    }
}
