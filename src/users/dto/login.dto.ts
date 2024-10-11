/**
 * LoginDto é um Data Transfer Object (DTO) utilizado para validar e transferir dados 
 * durante o processo de login de um usuário na aplicação.
 * 
 * Autores: [Filipe Santos Lima, Luiz Augusto Mendes Barbosa, Marcos Cabral Barbosa].
 */
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}