/* eslint-disable prettier/prettier */
import {IsDate, IsNotEmpty, IsString} from 'class-validator';
export class AlbumDto {

    @IsString()
    @IsNotEmpty()
    readonly titulo: string;

    @IsDate()
    @IsNotEmpty()
    readonly fechaInicio: Date;

    @IsDate()
    @IsNotEmpty()
    readonly fechaFin: Date;

}
 
    
 

