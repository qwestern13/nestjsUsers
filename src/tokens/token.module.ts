import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Tokens } from '../tokens/token.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokenService } from '../tokens/token.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';


@Module({
  providers: [TokenService],
  imports: [
    forwardRef(() => UsersModule),
    SequelizeModule.forFeature([Tokens])
  ],
  exports: [
    TokenService
  ]
})
export class TokenModule {}