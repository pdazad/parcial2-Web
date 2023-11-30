import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
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

  @OneToOne(() => AlbumEntity, (album) => album.foto)
  @JoinColumn()
  album: AlbumEntity;
  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.fotos)
  usuario: UsuarioEntity;
}
