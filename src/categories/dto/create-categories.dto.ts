/**
 * CreateCategoriesDto é um Data Transfer Object (DTO) usado para a criação de novas categorias.
 * Ele valida que o campo `name` é uma string não vazia, garantindo
 * que a informação necessária para a criação de uma categoria esteja presente.
 * 
 * Autores: [Filipe Santos Lima, Luiz Augusto Mendes Barbosa, Marcos Cabral Barbosa].
 */
import { IsNotEmpty, IsString} from 'class-validator';

export class CreateCategoriesDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}