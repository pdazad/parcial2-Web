/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsuarioEntity } from '../../usuario/usuario.entity/usuario.entity';
import { AlbumEntity } from '../../album/album.entity/album.entity';

@Entity()
export class FotoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  iso: number;
  @Column()
  velObturacion: number;
  @Column()
  apertura: number;
  @Column()
  fecha: Date;

  @ManyToOne(() => AlbumEntity, (album) => album.fotos)
  album: AlbumEntity;
  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.fotos)
  usuario: UsuarioEntity;
}
