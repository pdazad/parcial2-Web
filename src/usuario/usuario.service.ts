/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity/usuario.entity';

@Injectable()
export class UsuarioService {
   constructor(
       @InjectRepository(UsuarioEntity)
       private readonly usuarioRepository: Repository<UsuarioEntity>
   ){}

   async findAll(): Promise<UsuarioEntity[]> {
       return await this.usuarioRepository.find({ relations: ["fotos", "redSocial"] });
   }

   async findOne(id: string): Promise<UsuarioEntity> {
       const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id}, relations: ["fotos", "redSocial"] } );
       if (!usuario)
         throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND);
  
       return usuario;
   }
  
   async create(usuario: UsuarioEntity): Promise<UsuarioEntity> {

    if (usuario.telefono.length !== 10){
        throw new BusinessLogicException("The usuario's telefono must have exactly 10 characters", BusinessError.BAD_REQUEST);
    }

    return await this.usuarioRepository.save(usuario);
}


async update(id: string, usuario: UsuarioEntity): Promise<UsuarioEntity> {
    const persistedUsuario: UsuarioEntity = await this.usuarioRepository.findOne({where:{id}});
    if (!persistedUsuario)
      throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND);
    usuario.id = id; 
    return await this.usuarioRepository.save(usuario);
}

async delete(id: string) {
    const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where:{id}});
    if (!usuario)
      throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND);
 
    await this.usuarioRepository.remove(usuario);
}


}