/**
 * JwtStrategy é uma estratégia de autenticação que utiliza tokens JWT
 * para validar a identidade do usuário. 
 * 
 * Esta classe estende PassportStrategy e configura a extração do token
 * JWT do cabeçalho de autorização da requisição. O método `validate`
 * é chamado para verificar a validade do token e retornar os dados do
 * usuário associado ao token.
 * 
 * Autores: [Filipe Santos Lima, Luiz Augusto Mendes Barbosa, Marcos Cabral Barbosa].
 */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '1234',
    });
  }
  async validate(payload: any) {
    return this.usersService.getUserById(payload.sub); 
  }
}