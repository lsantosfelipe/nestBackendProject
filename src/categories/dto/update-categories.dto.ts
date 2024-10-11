/**
 * UpdateCategoriesDto é um Data Transfer Object (DTO) usado para 
 * atualizar categorias existentes. Ele valida que o campo `name` é uma string não vazia e que a propriedade
 * `products` é um array de objetos do tipo UpdateProductDto, cada um representando
 * um produto a ser atualizado. Cada produto deve ter um `ean`, `name` e `idCategory`
 * que também são validados.
 */

import { IsNotEmpty, IsString, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  ean: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  idCategory: number;
}

export class UpdateCategoriesDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductDto)
  products: UpdateProductDto[]; // Lista de produtos
}