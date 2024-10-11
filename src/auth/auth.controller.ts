/**
 * AuthController é responsável pela gestão da autenticação dos usuários.
 * Define o prefixo da rota para as requisições relacionadas a autenticação de usuários.
 * 
 * Authores: [Filipe Santos Lima, Luiz Augusto Mendes Barbosa, Marcos Cabral Barbosa].
 */
import { Controller, Post, Body, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    try {
      const user = await this.authService.validateUser(loginDto.email, loginDto.password);

      if (!user) {
        throw new UnauthorizedException('E-mail e/ou senha incorretos, verifique e tente novamente');
      }

      const token = this.authService.login(user);
      return {
        id: user.id,
        name: user.username,
        type: user.type,
        token,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao efetuar o login');
    }
  }
}