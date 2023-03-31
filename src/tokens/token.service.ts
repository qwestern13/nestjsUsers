import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { where } from 'sequelize';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { CreateTokenDto } from './dto/create-tokem.dto';
import { Tokens } from './token.model';

@Injectable()
export class TokenService {
    constructor(@InjectModel(Tokens) private tokenRepository: typeof Tokens,
                                     private userRepository: UsersService) {}

    async saveToken(userid, rToken) {
        const tokenData = await this.tokenRepository.findOne({where: {userid}});
        if (tokenData) {
            tokenData.refreshToken = rToken;
            console.log(tokenData);
            return tokenData.save();
       }
       console.log(userid);
       console.log(rToken);
        const token = await this.tokenRepository.create({userid: userid, refreshToken: rToken});
        return token;
};
}
