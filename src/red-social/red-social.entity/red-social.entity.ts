import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from '../../usuario/usuario.entity/usuario.entity';

@Entity()
export class redSocialEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  nombre: string;
  @Column()
  slogan: string;

  @OneToMany(() => UsuarioEntity, (usuario) => usuario.redSocial)
  usuarios: UsuarioEntity[];
}
