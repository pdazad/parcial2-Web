import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redSocialEntity } from 'src/red-social/red-social.entity/red-social.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { UsuarioService } from '../usuario.service';
import { UsuarioController } from '../usuario.controller/usuario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity, redSocialEntity])],
  providers: [UsuarioService],
  exports: [UsuarioService],
  controllers: [UsuarioController],
})
export class UsuarioModule {}
