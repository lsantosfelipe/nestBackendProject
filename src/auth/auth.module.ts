/**
 * AuthModule é responsável pela autenticação de usuários,
 * incluindo a gestão de tokens JWT e a validação de credenciais.
 * 
 * Este módulo importa o UsersModule e o JwtModule, além de registrar
 * o AuthService e o JwtStrategy como provedores, e expor o AuthService e o JwtModule
 * para outros módulos que precisem de funcionalidades de autenticação.
 * 
 * Autores: [Filipe Santos Lima, Luiz Augusto Mendes Barbosa, Marcos Cabral Barbosa].
 */
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: '1234',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
