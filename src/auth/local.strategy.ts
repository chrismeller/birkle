import { Strategy } from 'passport-local';
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({ usernameField: 'email' });
    }

    public async validate(email: string, password: string): Promise<UserDto> {
        const user = await this.authService.validate(email, password);

        if (user === null) {
            throw new UnauthorizedException();
        }

        return user;
    }
}