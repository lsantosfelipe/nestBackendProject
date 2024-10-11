/**
 * AuthService é responsável pela lógica de autenticação de usuários,
 * incluindo a validação de credenciais e a geração de tokens JWT.
 * 
 * Este serviço interage com o UsersService para buscar usuários pelo e-mail
 * e validar as credenciais fornecidas. Além disso, é responsável por criar
 * o token de acesso ao usuário após a autenticação bem-sucedida.
 * 
 * Autores: [Filipe Santos Lima, Luiz Augusto Mendes Barbosa, Marcos Cabral Barbosa].
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}