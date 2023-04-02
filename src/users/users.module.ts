import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { TokenModule } from 'src/tokens/token.module';
import { Profile } from 'src/profile/profile.model';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([User, Role, UserRoles, Profile]),
        RolesModule,
        ProfileModule,
        forwardRef(() => AuthModule),
        //TokenModule
    ],
    exports: [
        UsersService
    ]
})
export class UsersModule {
}
