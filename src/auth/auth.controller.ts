import { Body, Controller, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {};

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);

    };

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    };

    @Post('/logout')
    logout(@Body() userDto: CreateUserDto) {
        return this.authService.logout(userDto);
    };
}
