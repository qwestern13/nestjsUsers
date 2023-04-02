import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ImageFile } from 'src/file/file.model';
import { FileService } from 'src/file/file.service';
import { CreateTextBlockDto } from './dto/create-texblock.dto';
import { TextBlock } from './textblock.model';

@Injectable()
export class TextblockService {

    constructor(@InjectModel(TextBlock) private textBlock: typeof TextBlock,
                @InjectModel(ImageFile) private imageFile: typeof ImageFile,
                                        private fileService: FileService) {

    }

    async create(dto: CreateTextBlockDto) {

        const post = await this.textBlock.create({...dto});
        const image = await this.imageFile.findOne({where: {id: dto.imageid}})
        image.essenceId = post.id;
        await image.save();
        return post;
    }

    async addImageToPost(image: any) {
        const fileName = await this.fileService.addImage(image);
        const img = await this.imageFile.create({image: fileName});
    }

    async getPostByGroup(groupid: string){
        const group = this.textBlock.findAll({where: {group: groupid}, include: {all: true}})
        return group;
    }

    async delPost(id: number){
        const post = this.textBlock.findOne({where: {id: id}});
        if (!post) {
            throw new HttpException('Пост не найден', HttpStatus.NOT_FOUND);
        }
        const delpost = this.textBlock.destroy({where: {id: id}})
        return delpost;
    }
}
