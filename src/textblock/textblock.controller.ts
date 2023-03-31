import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTextBlockDto } from './dto/create-texblock.dto';
import { TextblockService } from './textblock.service';

@Controller('textblock')
export class TextblockController {
    constructor(private textBlockService: TextblockService) {

    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createTextBlock(@Body() dto: CreateTextBlockDto, 
                    @UploadedFile() image) {
        return this.textBlockService.create(dto, image);
    }
}
