import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';

@Module({
  providers: [ProfileService],
  exports: [ProfileService],
  imports: [
    SequelizeModule.forFeature([Profile, User])
  ]
})
export class ProfileModule {}
