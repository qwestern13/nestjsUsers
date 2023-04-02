import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Profile } from './profile.model';

@Injectable()
export class ProfileService {

    constructor(@InjectModel(Profile) private profileRepository: typeof Profile) {}

    async createProfile(dto: CreateUserDto) {
        const profile = await this.profileRepository.create(dto);
        return profile;
    }
}
