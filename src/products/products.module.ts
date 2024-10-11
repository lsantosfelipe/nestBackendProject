/**
 * ProductsModule é o módulo responsável por gerenciar os produtos dentro da aplicação.
 * O ProductsModule é responsável por organizar e encapsular a funcionalidade relacionada a produtos,
 * permitindo uma melhor modularização e reutilização de código.
 * 
 * Autores: [Filipe Santos Lima, Luiz Augusto Mendes Barbosa, Marcos Cabral Barbosa].
 */
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
})
export class ProductsModule {}