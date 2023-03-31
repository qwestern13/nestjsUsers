import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tokens } from '../tokens/token.model';
import { TokenService } from '../tokens/token.service';
import { TokenModule } from 'src/tokens/token.module';


@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      //signOptions: {
      //  expiresIn: '24h'
     // }

    }),

    TokenModule
  ],
  exports: [
    AuthService,
    JwtModule,
  ]
})
export class AuthModule {}
