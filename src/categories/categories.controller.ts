/**
 * CategoriesController gerencia as rotas relacionadas a categorias
 * dentro da aplicação, permitindo operações como criar, obter,
 * atualizar e deletar categorias. As rotas são acessíveis apenas por 
 * usuários autenticados.
 * 
 * Autores: [Filipe Santos Lima, Luiz Augusto Mendes Barbosa, Marcos Cabral Barbosa].
 */
import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createCategory(@Body() createCategoryDto: any) {
    return this.categoriesService.createCategories(createCategoryDto);
  } 

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getCategory(@Param('id') id: string) {
    return this.categoriesService.getCategoryById(Number(id));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateCategory(@Param('id') id: string, @Body() updateCategoryDto: any) {
    return this.categoriesService.updateCategory(Number(id), updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(Number(id));
  }
}