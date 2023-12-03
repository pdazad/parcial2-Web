/* eslint-disable prettier/prettier */
import {IsDate, IsNotEmpty, IsNumber} from 'class-validator';
export class FotoDto {

    @IsNumber()
    @IsNotEmpty()
    readonly iso: number;

    @IsNumber()
    @IsNotEmpty()
    readonly velObturacion: number;

    @IsNumber()
    @IsNotEmpty()
    readonly apertura: number;

    @IsDate()
    @IsNotEmpty()
    readonly fecha: Date;


}
 
    
 

