  /**
   * Módulo principal da aplicação.
   * 
   * Este módulo importa os módulos necessários para a funcionalidade da aplicação,
   * incluindo o PrismaModule para acesso ao banco de dados, UsersModule para
   * gerenciamento de usuários, ProductsModule para gerenciamento de produtos,
   * CategoriesModule para gerenciamento de categorias e AuthModule para
   * autenticação.
   * 
   * Também define os controladores e provedores que serão utilizados na aplicação.
   * 
   * Autores: [Filipe Santos Lima, Luiz Augusto Mendes Barbosa, Marcos Cabral Barbosa].
   */
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ PrismaModule, UsersModule, ProductsModule, CategoriesModule, AuthModule],
})
export class AppModule {}
