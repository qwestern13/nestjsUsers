import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { FileService } from 'src/file/file.service';
import { CreateTextBlockDto } from './dto/create-texblock.dto';
import { TextblockService } from './textblock.service';

@Controller('textblock')
export class TextblockController {
    constructor(private textBlockService: TextblockService,
                private fileService: FileService) {

    }

    @Post()
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    createTextBlock(@Body() dto: CreateTextBlockDto){
        return this.textBlockService.create(dto);
    }

    @Post('/add')
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @UseInterceptors(FileInterceptor('image'))
    addImageTextBlock(@UploadedFile() image) {
        return this.textBlockService.addImageToPost(image);
    }
    
    @Get('/:value')
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    getByVGroup(@Param('value') value: string) {
        return this.textBlockService.getPostByGroup(value);
    }

    @Delete('/:value')
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    delByVGroup(@Param('value') value: number) {
        this.textBlockService.delPost(value);
        return "Success"
    }
}
