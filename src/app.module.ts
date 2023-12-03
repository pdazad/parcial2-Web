/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FotoService } from './foto/foto.service';
import { UsuarioService } from './usuario/usuario.service';
import { AlbumService } from './album/album.service';
import { redSocialService } from './red-social/red-social.service';
import { AlbumFotoModule } from './album-foto/album-foto.module/album-foto.module';

@Module({
  imports: [AlbumFotoModule],
  controllers: [AppController],
  providers: [AppService, FotoService, UsuarioService, AlbumService, redSocialService],
})
export class AppModule {}
