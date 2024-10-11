/**
 * CreateProductDto é um Data Transfer Object (DTO) utilizado para
 * a criação de novos produtos na aplicação.
 *
 * Ele define a estrutura e as validações necessárias para
 * os dados de entrada ao criar um produto. Ele utiliza
 * decoradores do pacote class-validator para assegurar que os dados
 * atendam aos requisitos esperados.
 * 
 * Autores: [Filipe Santos Lima, Luiz Augusto Mendes Barbosa, Marcos Cabral Barbosa].
 */
import { IsNotEmpty, IsInt, IsString, IsDate} from 'class-validator';

export class CreateProductDto {
  @IsString()
  ean: string;

  @IsString()
  name: string;

  @IsInt()
  idCategory: number;

  @IsInt()
  insUser: number;

  @IsInt()
  updUser: number;
}