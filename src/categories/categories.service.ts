/**
 * CategoriesService é responsável pela lógica de negócios relacionada
 * às categorias da aplicação.
 * 
 * Este serviço permite a criação, recuperação, atualização e exclusão
 * de categorias. Ele interage com o PrismaService para realizar as
 * operações no banco de dados e trata exceções que podem ocorrer
 * durante essas operações.
 * 
 * Métodos principais:
 * - createCategories: Cria uma nova categoria, lançando um erro se a
 *   categoria já existir.
 * - getCategoryById: Recupera uma categoria pelo ID, lançando um erro
 *   se não for encontrada.
 * - getAllCategories: Recupera todas as categorias, retornando uma
 *   mensagem se nenhuma for encontrada.
 * - updateCategory: Atualiza uma categoria existente e seus produtos,
 *   lançando um erro se a categoria não for encontrada.
 * - deleteCategory: Exclui uma categoria e seus produtos associados,
 *   lançando um erro se a categoria não for encontrada.
 * 
 * Autores: [Filipe Santos Lima, Luiz Augusto Mendes Barbosa, Marcos Cabral Barbosa].
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { UpdateCategoriesDto } from './dto/update-categories.dto';
import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

 
  async createCategories(createCategoriesDto: CreateCategoriesDto) {
    try {
      const categoryExists = await this.prisma.category.findUnique({
        where: { name: createCategoriesDto.name },
      });
      if (categoryExists) {
        throw new ConflictException('Erro, categoria informada já existe!');
      }
      await this.prisma.category.create({
        data: {
          name: createCategoriesDto.name,
        },
      });
      return { message: 'Categoria criada com sucesso!' };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(`Erro ao criar categoria: ${error.message}`);
    }
  }

  async getCategoryById(id: number) {
    const category = await this.prisma.category.findUnique({ 
      where: {id},
      include: {products: true},
    });
    if (!category) {
      throw new NotFoundException(`Categoria não encontrada!`);
    }
    return category;
  }

  async getAllCategories() {try {
    const category = await this.prisma.category.findMany({
      include: { products: true },
    }); 
    if (category.length === 0) {
      return { message: 'Nenhuma categoria encontrada!' };
    }
    return category;
  } catch (error) {
    throw new InternalServerErrorException(`Erro ao buscar usuários: ${error.message}`);
  }
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoriesDto) {
    try {
      // Verifica se a categoria existe
      const existingCategory = await this.prisma.category.findUnique({
        where: { id },
      });

      if (!existingCategory) {
        throw new NotFoundException('Categoria não encontrada!');
      }
      // Atualiza a categoria
      await this.prisma.category.update({
        where: { id },
        data: {
          name: updateCategoryDto.name, 
        },
      });
      const updateProducts = await Promise.all(
        updateCategoryDto.products.map(async (productData) => {
          const existingProduct = await this.prisma.product.findUnique({
            where: { ean: productData.ean },
          });

          if (!existingProduct) {
            throw new NotFoundException(`Produto com EAN ${productData.ean} não encontrado!`);
          }
          return this.prisma.product.update({
            where: { ean: productData.ean },
            data: {
              name: productData.name,
              idCategory: id, 
            },
          });
        }),
      );
      return { message: 'Categoria e produtos atualizados com sucesso!' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Erro ao atualizar categoria: ${error.message}`);
    }
  }

  async deleteCategory(id: number) {
    try {
      // Verifica se a categoria existe
      const existingCategory = await this.prisma.category.findUnique({
        where: { id },
      });

      if (!existingCategory) {
        throw new NotFoundException('Categoria não encontrada!');
      }

      // Exclui os produtos associados à categoria
      await this.prisma.product.deleteMany({
        where: { idCategory: id },
      });

      // Exclui a categoria
      await this.prisma.category.delete({
        where: { id },
      });

      return { message: 'Categoria excluída com sucesso!' };
    } catch (error) {
      throw new InternalServerErrorException(`Erro ao excluir categoria: ${error.message}`);
    }
  }
}