import { Controller, Request, Post, Res, Body, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private readonly authService: AuthService) {

    }

    @Post('register')
    public async register (@Request() req, @Res() res, @Body() user: RegisterUserDto) {
        try {
            // nest has done our (limited) validation for us, all we'll do is check to see if the user exists
            await this.authService.register(user);

            return res.code(201).send({ result: 'success' });
        }
        catch(e) {
            this.logger.error('Error during registration!', e);
            return res.code(500).send({ result: 'error' });
        }
    }
}
