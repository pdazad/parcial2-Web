/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FotoEntity } from '../../foto/foto.entity/foto.entity';
import { AlbumEntity } from '../../album/album.entity/album.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../../shared/errors/business-errors';

@Injectable()
export class AlbumFotoService {
   constructor(
       @InjectRepository(AlbumEntity)
       private readonly albumRepository: Repository<AlbumEntity>,
   
       @InjectRepository(FotoEntity)
       private readonly fotoRepository: Repository<FotoEntity>
   ) {}

   async addFotoAlbum(albumId: string, fotoId: string): Promise<AlbumEntity> {

    const foto: FotoEntity = await this.fotoRepository.findOne({ where: { id: fotoId } });
    if (!foto) {
        throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
    }

    // Obtener la información del álbum
    const album: AlbumEntity = await this.albumRepository.findOne({
        where: { id: albumId },
        relations: ["fotos"]
    });
    if (!album) {
        throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
    }

    // Verificar que la fecha de la foto esté dentro del rango del álbum
    const fotoDate: Date = foto.fecha; 
    const albumStartDate: Date = album.fechaInicio; 
    const albumEndDate: Date = album.fechaFin; 

    if (fotoDate < albumStartDate || fotoDate > albumEndDate) {
        throw new BusinessLogicException("The photo date is not within the album's date range", BusinessError.VALIDATION_ERROR);
    }

    album.fotos = [...album.fotos, foto];
    return await this.albumRepository.save(album);

    }

   async findFotoByAlbumIdFotoId(albumId: string, fotoId: string): Promise<FotoEntity> {
       const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: fotoId}});
       if (!foto)
         throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND)
      
       const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}, relations: ["fotos"]});
       if (!album)
         throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND)
  
       const albumFoto: FotoEntity = album.fotos.find(e => e.id === foto.id);
  
       if (!albumFoto)
         throw new BusinessLogicException("The foto with the given id is not associated to the album", BusinessError.PRECONDITION_FAILED)
  
       return albumFoto;
   }
   
   async findFotosByAlbumId(albumId: string): Promise<FotoEntity[]> {
       const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}, relations: ["fotos"]});
       if (!album)
         throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND)
      
       return album.fotos;
   }
   
   async associateFotosAlbum(albumId: string, fotos: FotoEntity[]): Promise<AlbumEntity> {
       const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}, relations: ["fotos"]});
   
       if (!album)
         throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND)
   
       for (let i = 0; i < fotos.length; i++) {
         const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: fotos[i].id}});
         if (!foto)
           throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND)
       }
   
       album.fotos = fotos;
       return await this.albumRepository.save(album);
     }
   
   async deleteFotoAlbum(albumId: string, fotoId: string){
       const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: fotoId}});
       if (!foto)
         throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND)
   
       const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}, relations: ["fotos"]});
       if (!album)
         throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND)
   
       const albumFoto: FotoEntity = album.fotos.find(e => e.id === foto.id);
   
       if (!albumFoto)
           throw new BusinessLogicException("The foto with the given id is not associated to the album", BusinessError.PRECONDITION_FAILED)

       const albumFotoIndex: number = album.fotos.findIndex(e => e.id === foto.id);
       
       album.fotos = album.fotos.filter(e => e.id !== fotoId);
       await this.albumRepository.save(album);

       album.fotos.splice(albumFotoIndex, 1);

        if (album.fotos.length === 0) {
            // Si no quedan más fotos en el álbum, eliminar el álbum también
            await this.albumRepository.remove(album);
        } else {
            // Si aún hay más fotos, guardar el álbum actualizado
            await this.albumRepository.save(album);
    }
   }  
}