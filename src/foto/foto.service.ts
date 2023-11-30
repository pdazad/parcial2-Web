/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { FotoEntity } from './foto.entity/foto.entity';

@Injectable()
export class FotoService {
   constructor(
       @InjectRepository(FotoEntity)
       private readonly fotoRepository: Repository<FotoEntity>
   ){}

   async findAll(): Promise<FotoEntity[]> {
       return await this.fotoRepository.find({ relations: ["album", "usuario"] });
   }

   async findOne(id: string): Promise<FotoEntity> {
       const foto: FotoEntity = await this.fotoRepository.findOne({where: {id}, relations: ["album", "usuario"] } );
       if (!foto)
         throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
  
       return foto;
   }
  
   async create(foto: FotoEntity): Promise<FotoEntity> {

    if (!(foto.iso >= 100 && foto.iso <= 6400)){
        throw new BusinessLogicException("The foto's iso must be between 100 and 6400", BusinessError.BAD_REQUEST);
    }

    if (!(foto.velObturacion >= 2 && foto.velObturacion <= 250)){
        throw new BusinessLogicException("The foto's velObturacion must be between 2 and 250", BusinessError.BAD_REQUEST);
    }

    if (!(foto.apertura >= 1 && foto.apertura <= 32)){
        throw new BusinessLogicException("The foto's apertura must be between 2.8 and 22", BusinessError.BAD_REQUEST);
    }

    return await this.fotoRepository.save(foto);
}


async update(id: string, foto: FotoEntity): Promise<FotoEntity> {
    const persistedfoto: FotoEntity = await this.fotoRepository.findOne({where:{id}});
    if (!persistedfoto)
      throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
    foto.id = id; 
    return await this.fotoRepository.save(foto);
}

async delete(id: string) {
    const foto: FotoEntity = await this.fotoRepository.findOne({where:{id}});

    if (!foto)
      throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
 
    await this.fotoRepository.remove(foto);
}


}