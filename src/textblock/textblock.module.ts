import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileModule } from 'src/file/file.module';
import { TextblockController } from './textblock.controller';
import { TextBlock } from './textblock.model';
import { TextblockService } from './textblock.service';

@Module({
  controllers: [TextblockController],
  providers: [TextblockService],
  imports: [
    SequelizeModule.forFeature([TextBlock]),
    FileModule
  ]
})
export class TextblockModule {}
