import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as fs from 'fs';
import * as path from 'path';
import { TextBlock } from 'src/textblock/textblock.model';
import * as uuid from 'uuid';
import { ImageFile } from './file.model';

@Injectable()
export class FileService {

    async createFile(file): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static');
            if(!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true});
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            return fileName;
        }
        catch(e){
            throw new HttpException('Произошла ошибка записи файла', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async addImage(image: any) {
        const fileName = await this.createFile(image);
        console.log(fileName);
        return fileName;
    }
}
