/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoEntity } from '../../foto/foto.entity/foto.entity';
import { AlbumEntity } from '../../album/album.entity/album.entity';
import { AlbumFotoService } from '../album-foto.service/album-foto.service';
import { AlbumFotoController } from '../album-foto.controller/album-foto.controller';
@Module({
  providers: [AlbumFotoService],
  imports: [TypeOrmModule.forFeature([AlbumEntity, FotoEntity])],
  controllers: [AlbumFotoController],
})
export class AlbumFotoModule {}