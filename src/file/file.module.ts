import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TextBlock } from 'src/textblock/textblock.model';
import { TextblockModule } from 'src/textblock/textblock.module';
import { TextblockService } from 'src/textblock/textblock.service';
import { ImageFile } from './file.model';
import { FileService } from './file.service';

@Module({
  providers: [FileService],
  exports: [FileService],
  imports: [
    SequelizeModule.forFeature([ImageFile, TextBlock]),
    forwardRef(() => TextblockModule)
  ]
})
export class FileModule {}
