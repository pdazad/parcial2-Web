/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoEntity } from '../../../foto/foto.entity/foto.entity';
import { UsuarioEntity } from '../../../usuario/usuario.entity/usuario.entity';
import { AlbumEntity } from '../../../album/album.entity/album.entity';
import { redSocialEntity } from '../../../red-social/red-social.entity/red-social.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [FotoEntity, UsuarioEntity, AlbumEntity, redSocialEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([FotoEntity, UsuarioEntity, AlbumEntity, redSocialEntity]),
];