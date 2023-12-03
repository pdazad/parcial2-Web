import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoService } from '../foto.service';
import { FotoEntity } from '../foto.entity/foto.entity';
import { AlbumEntity } from '../../album/album.entity/album.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FotoEntity, AlbumEntity, UsuarioEntity])],
  providers: [FotoService],
  exports: [FotoService],
})
export class FotoModule {}
