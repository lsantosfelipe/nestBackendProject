/**
 * ProductsService é um serviço responsável pela lógica de negócio relacionada aos produtos na aplicação.
 *
 * Este serviço fornece as seguintes funcionalidades:
 * - create: Cria um novo produto, verificando se a categoria existe e se o produto já não está cadastrado.
 * - getProductById: Retorna um produto pelo seu ID, ou lança uma exceção se não encontrado.
 * - updateProduct: Atualiza as informações de um produto existente, verificando se ele existe.
 * - deleteProduct: Remove um produto pelo seu ID, lançando uma exceção se não encontrado.
 * - getAllProducts: Retorna todos os produtos cadastrados na aplicação.
 *
 * O ProductsService utiliza o PrismaService para interagir com o banco de dados e garantir a integridade
 * das operações realizadas.
 * 
 * Autores: [Filipe Santos Lima, Luiz Augusto Mendes Barbosa, Marcos Cabral Barbosa].
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ConflictException, NotFoundException, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
 
  async create(createProductDto: CreateProductDto) {
    try{
      const categoryExists = await this.prisma.category.findUnique({
        where: { id: createProductDto.idCategory },
      });
      if (!categoryExists) {
        throw new NotFoundException('Categoria não encontrada!');
      }
      const existingProduct = await this.prisma.product.findUnique({
        where: { ean: createProductDto.ean },
      });
      if (existingProduct) {
        throw new ConflictException('Erro, produto informado já existe!');
      }
      const product = await this.prisma.product.create({
        data: {
          ean: createProductDto.ean,
          name: createProductDto.name,
          idCategory: createProductDto.idCategory,
          insUser: createProductDto.insUser,
          updUser: createProductDto.updUser,
        },
      });
      return { message: 'Produto criado com sucesso!'};
    }catch(error){
    return {message: `Erro ao criar produto: ${error.message}`};
    }
  }

  async getProductById(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Produto não encontrado!`);
    }
    return product;
  }

  async updateProduct(id: number, updateProductDto: Partial<CreateProductDto>) {
    try {
      const product = await this.prisma.product.findUnique({ where: { id } });
      if (!product) {
        throw new NotFoundException(`Produto não encontrado!`);
      }
      await this.prisma.product.update({
        where: { id },
        data: {
          ean: updateProductDto.ean,
          name: updateProductDto.name,
          idCategory: updateProductDto.idCategory,
          updUser: updateProductDto.updUser,
        },
      });
      return { message: 'Produto atualizado com sucesso!'};
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Erro ao atualizar produto: ${error.message}`);
    }
  }

  async deleteProduct(id: number): Promise<any> {
    try{
      const product = await this.prisma.product.findUnique({ where: { id } });
      if (!product) {
        throw new NotFoundException(`Produto não encontrado!`);
      }
      await this.prisma.product.delete({ 
        where: { id } 
      });
      return { message: 'Produto deletado com sucesso!' };
    }catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Erro ao deletar produto: ${error.message}`);
    }
  }

  async getAllProducts() {
    try {
      const products = await this.prisma.product.findMany(); 
      if (products.length === 0) {
        return { message: 'Nenhum produto encontrado!' };
      }
      return products;
    } catch (error) {
      throw new InternalServerErrorException(`Erro ao buscar produtos: ${error.message}`);
    }
  }
}
