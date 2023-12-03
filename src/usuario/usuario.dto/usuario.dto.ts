/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString} from 'class-validator';
export class UsuarioDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly telefono: string;

}
 
    
 

