import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { generate } from 'rxjs';
import { User } from 'src/users/users.model';
import jwt from 'jsonwebtoken';
import { TokenService } from '../tokens/token.service';
import { Tokens } from '../tokens/token.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTokenDto } from 'src/tokens/dto/create-tokem.dto';

@Injectable()
export class AuthService {

    constructor(//@InjectModel(Tokens) private tokenRepository: typeof Tokens,
                private userService: UsersService,
                private jwtService: JwtService,
                private tokenService: TokenService) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);

    };

    async logout(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
        
         
    };


    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST);
        };
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword});
        return this.generateToken(user);
    }
    
    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles,};
        const accessToken = this.jwtService.sign(payload, {expiresIn: '60s'});
        const refreshToken = this.jwtService.sign(payload, {expiresIn: '30d'});
        const savet = this.tokenService.saveToken(payload.id, refreshToken);
        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        };
    };

    p
   

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: "Неверный email (логин) или пароль"});
    }
}

    

