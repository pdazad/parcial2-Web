import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '../album.entity/album.entity';
import { AlbumService } from '../album.service';
import { FotoEntity } from '../../foto/foto.entity/foto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity, FotoEntity])],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
