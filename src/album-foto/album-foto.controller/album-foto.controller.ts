/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors} from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { AlbumFotoService } from '../album-foto.service/album-foto.service';
import { FotoDto } from '../../foto/foto.dto/foto.dto';
import { plainToInstance } from 'class-transformer';
import { FotoEntity } from '../../foto/foto.entity/foto.entity';

@Controller('albums')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumFotoController {
    constructor( private readonly albumFotoService: AlbumFotoService ) {}

    @Post(':albumId/fotos/:fotoId')
    async addFotoAlbum(@Param('albumId') albumId: string, @Param('fotoId') fotoId: string) {
        return await this.albumFotoService.addFotoAlbum(albumId, fotoId);
    }

    @Get(':albumId/fotos/:fotoId')
    async findFotoByAlbumIdFotoId(@Param('albumId') albumId: string, @Param('fotoId') fotoId: string) {
        return await this.albumFotoService.findFotoByAlbumIdFotoId(albumId, fotoId);
    }

    @Get(':albumId/fotos')
    async findFotosByAlbumId(@Param('albumId') albumId: string) {
        return await this.albumFotoService.findFotosByAlbumId(albumId);
    }

    @Put(':albumId/fotos')
    async associateFotosAlbum(@Body() fotosDto: FotoDto[], @Param('albumId') albumId: string) {
        const fotos = plainToInstance(FotoEntity, fotosDto)
        return await this.albumFotoService.associateFotosAlbum(albumId, fotos);
    }

    @Delete(':albumId/fotos/:fotoId')
    @HttpCode(204)
    async deleteFotoAlbum(@Param('albumId') albumId: string, @Param('fotoId') fotoId: string) {
        return await this.albumFotoService.deleteFotoAlbum(albumId, fotoId);
    }
}
