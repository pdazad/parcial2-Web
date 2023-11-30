import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redSocialEntity } from 'src/red-social/red-social.entity/red-social.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { UsuarioService } from '../usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity, redSocialEntity])],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
