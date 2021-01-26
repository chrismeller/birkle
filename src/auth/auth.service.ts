import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from 'src/users/users.service';
import { RegisterUserRequest } from './interfaces/register-user-request.interface';
import { Hasher } from './hasher.provider';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(private readonly usersService: UsersService) {

    }

    public async register (user: RegisterUserRequest): Promise<boolean> {
        // we need to generate a hash of the password, with a custom salt
        const salt = Hasher.createSalt();
        const passwordHash = Hasher.hash(user.password, salt);

        // we also need to generate a verification token to use for validating the email
        const verificationToken = uuidv4();

        // now we can just hand everything to the user service to store
        await this.usersService.create(user.id, user.email, user.firstname, user.surname, passwordHash, salt, verificationToken);

        // the user was created, so we should send an email to them to verify their account
        // @todo send out the email, rather than just talking about it

        return true;
    }

    public async userExists (email: string): Promise<boolean> {
        const result = await this.usersService.getByEmail(email);

        if (result !== null) {
            return true;
        }

        return false;
    }

    public async validate (email: string, pass: string) : Promise<UserDto> {
        // @todo this should be an interface, not the model!!
        const user = await this.usersService.getByEmail(email);

        // if the user doesn't exist, we kick it back
        if (user === null) {
            return null;
        }

        // if the user exists, but their email is not verified, kick it back
        if (user.EmailVerifiedAt === null) {
            return null;
        }

        // now we calculate what their password hash should be based on their input and salt
        const passwordHash = Hasher.hash(pass, user.PasswordSalt);

        // does that match what we have?
        if (user.PasswordHash === passwordHash) {
            return {
                id: user.Id,
                email: user.Email,
                firstname: user.FirstName,
                surname: user.Surname,
            }
        }

        // if we've gotten here, their password is wrong
        return null;
    }

    public async verifyEmail(userId: string, token: string): Promise<boolean> {
        const user = await this.usersService.getById(userId);

        // if the user doesn't exist, it's obviously invalid
        if (user === null) {
            return false;
        }

        if (user.VerificationToken === token) {
            await this.usersService.markEmailVerified(user.Id, new Date());
            return true;
        }

        return false;
    }
}
