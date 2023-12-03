/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString} from 'class-validator';
export class redSocialDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly slogan: string;

}
 
    
 

