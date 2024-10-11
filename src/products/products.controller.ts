/**
 * ProductsController é o controlador responsável por gerenciar as rotas relacionadas aos produtos.
 *
 * Este controlador define as seguintes rotas e métodos HTTP para a manipulação de produtos:
 * - POST /products: Cria um novo produto. Requer autenticação via JWT.
 * - GET /products/:id: Recupera um produto específico pelo seu ID. Requer autenticação via JWT.
 * - GET /products: Recupera todos os produtos. Requer autenticação via JWT.
 * - PUT /products/:id: Atualiza um produto específico pelo seu ID. Requer autenticação via JWT.
 * - DELETE /products/:id: Exclui um produto específico pelo seu ID. Requer autenticação via JWT.
 *
 * O controlador utiliza o ProductsService para realizar operações relacionadas aos produtos
 * e o JwtAuthGuard para garantir que apenas usuários autenticados possam acessar as rotas.
 * 
 * Autores: [Filipe Santos Lima, Luiz Augusto Mendes Barbosa, Marcos Cabral Barbosa].
 */
import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }
 
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getProduct(@Param('id') id: string) {
    return this.productsService.getProductById(Number(id));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateProduct(@Param('id') id: number, @Body() updateData: any) {
    return this.productsService.updateProduct(id, updateData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(Number(id));
  }
}