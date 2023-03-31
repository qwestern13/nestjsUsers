import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FileService } from 'src/file/file.service';
import { CreateTextBlockDto } from './dto/create-texblock.dto';
import { TextBlock } from './textblock.model';

@Injectable()
export class TextblockService {

    constructor(@InjectModel(TextBlock) private textBlock: typeof TextBlock,
                                        private fileService: FileService) {

    }

    async create(dto: CreateTextBlockDto, image: any) {
        const fileName = await this.fileService.createFile(image);
        const post = await this.textBlock.create({...dto, image: fileName});
        return post;
    }
}
