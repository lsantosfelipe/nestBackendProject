/**
 * JwtAuthGuard é um guardião de autenticação que utiliza a estratégia JWT
 * para proteger as rotas que exigem autenticação de usuários.
 * 
 * Ele herda da classe AuthGuard do Passport, garantindo que apenas
 * usuários autenticados possam acessar as rotas protegidas.
 * 
 * Autores: [Filipe Santos Lima, Luiz Augusto Mendes Barbosa, Marcos Cabral Barbosa].
 */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}