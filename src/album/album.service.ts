/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity/album.entity';

@Injectable()
export class AlbumService {
   constructor(
       @InjectRepository(AlbumEntity)
       private readonly albumRepository: Repository<AlbumEntity>
   ){}

   async findAll(): Promise<AlbumEntity[]> {
       return await this.albumRepository.find({ relations: ["fotos"] });
   }

   async findOne(id: string): Promise<AlbumEntity> {
       const album: AlbumEntity = await this.albumRepository.findOne({where: {id}, relations: ["fotos"] } );
       if (!album)
         throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
  
       return album;
   }
  
   async create(album: AlbumEntity): Promise<AlbumEntity> {
    // Validar que el nombre no esté vacío
    if (!album.titulo) {
        throw new BusinessLogicException("The tittle of the album cannot be empty", BusinessError.VALIDATION_ERROR);
    }

    // Continuar con la creación del álbum si pasa la validación
    return await this.albumRepository.save(album);
    }

    async update(id: string, album: AlbumEntity): Promise<AlbumEntity> {
        const persistedAlbum: AlbumEntity = await this.albumRepository.findOne({where:{id}});
        if (!persistedAlbum)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        album.id = id; 
        return await this.albumRepository.save(album);
    }
    
    async delete(id: string) {
        const album: AlbumEntity = await this.albumRepository.findOne({where:{id}, relations: ["fotos"] });
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);

        if (album.fotos && album.fotos.length > 0) {
            throw new BusinessLogicException("Cannot delete the album because it has associated photo", BusinessError.INVALID_OPERATION);
        }
     
        await this.albumRepository.remove(album);
    }



}