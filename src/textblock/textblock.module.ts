import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { ImageFile } from 'src/file/file.model';
import { FileModule } from 'src/file/file.module';
import { FileService } from 'src/file/file.service';
import { TextblockController } from './textblock.controller';
import { TextBlock } from './textblock.model';
import { TextblockService } from './textblock.service';

@Module({
  controllers: [TextblockController],
  providers: [TextblockService],
  imports: [
    SequelizeModule.forFeature([TextBlock, ImageFile]),
    forwardRef(() => FileModule),
    AuthModule
  ]
})
export class TextblockModule {}
