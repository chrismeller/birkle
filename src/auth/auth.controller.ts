import { Controller, Request, Post, Get, Param, Res, Body, Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { get } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private readonly authService: AuthService) {

    }

    @Post('register')
    public async register (@Res() res, @Body() user: RegisterUserDto) {
        try {
            // nest has done our (limited) validation for us, all we'll do is check to see if the user exists
            if (await this.authService.userExists(user.email)) {
                return res.status(400).send({ statusCode: 400, message: 'User already exists!'  });
            }

            // convert the DTO to the interface our service expects by adding an ID
            var u = {...user, id: uuidv4()};

            await this.authService.register(u);

            return res.status(201).send({ statusCode: 201, message: 'success' });
        }
        catch(e) {
            this.logger.error('Error during registration!', e);
            return res.status(500).send({ statusCode: 500, error: 'Internal Error' });
        }
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    public async login(@Request() req) {
        // return this.authService.login(req.user);
        return true;
    }

    @Get('verify/:userId/:token')
    public async verify(@Res() res, @Param('userId') userId: string, @Param('token') token: string) {
        const result = await this.authService.verifyEmail(userId, token);

        if (result === true) {
            return res.status(200).send({ statusCode: 200, message: 'success' });
        }
        else {
            return res.status(400).send({ statusCode: 400, message: 'Invalid token!' });
        }
    }
}
