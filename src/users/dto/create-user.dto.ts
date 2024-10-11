/**
 * CreateUserDto é um Data Transfer Object (DTO) utilizado para validar e transferir dados 
 * ao criar um novo usuário na aplicação.
 *
 * Este DTO utiliza decorators da biblioteca class-validator para garantir que os dados recebidos estejam 
 * no formato esperado antes de serem processados pela aplicação.
 * 
 * Autores: [Filipe Santos Lima, Luiz Augusto Mendes Barbosa, Marcos Cabral Barbosa].
 */
import { IsEmail, IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsInt()
    insUser: number; 
    @IsInt()
    updUser: number;

    @IsInt()
    type: number;
}