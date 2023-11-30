import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FotoEntity } from '../../foto/foto.entity/foto.entity';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  titulo: string;
  @Column()
  fechaInicio: Date;
  @Column()
  fechaFin: Date;

  @OneToOne(() => FotoEntity, (foto) => foto.album)
  foto: FotoEntity;
}
