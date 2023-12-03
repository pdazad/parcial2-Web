import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FotoEntity } from '../../foto/foto.entity/foto.entity';
import { redSocialEntity } from '../../red-social/red-social.entity/red-social.entity';

@Entity()
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  nombre: string;
  @Column()
  telefono: string;

  @OneToMany(() => FotoEntity, (foto) => foto.usuario)
  fotos: FotoEntity[];
  @ManyToOne(() => redSocialEntity, (redSocial) => redSocial.usuarios)
  redSocial: redSocialEntity;
}
