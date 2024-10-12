/*
* Aqui, definimos a classe UsersService. Esta classe é responsável por gerenciar as operações relacionadas a usuários na aplicação.
* As operações disponíveis são: login, createUser, findByEmail, getUserById, updateUser, deleteUser, updatePassword e findAll.
* 
* Autores: [Filipe Santos Lima, Luiz Augusto Mendes Barbosa, Marcos Cabral Barbosa].
*/
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { NotFoundException, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AppUser } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  /**
   * Realiza o login do usuário, verificando as credenciais fornecidas.
   * 
   * @param email - O email do usuário.
   * @param password - A senha do usuário.
   * @returns Um objeto contendo um token JWT se as credenciais estiverem corretas.
   * @throws UnauthorizedException se o email ou a senha estiverem incorretos.
   */
  async login(email: string, password: string) {
    const user = await this.prisma.appUser.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos, verifique e tente novamente');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos, verifique e tente novamente');
    }
    
    return { 
      id: user.id, 
      username: user.username, 
      type: user.type, 
      token: this.jwtService.sign({ email: user.email, sub: user.id }) 
    };
}

  /**
   * Cria um novo usuário com base nos dados fornecidos.
   * 
   * @param createUserDto - Os dados do usuário a serem criados.
   * @returns Uma mensagem de sucesso se o usuário for criado com sucesso.
   * @throws ConflictException se o usuário já existir.
   * @throws InternalServerErrorException em caso de erro ao criar o usuário.
   */
  async createUser(createUserDto: CreateUserDto) {
    try {
      const userExist = await this.prisma.appUser.findUnique({
        where: { email: createUserDto.email },
      });
      if (userExist) {
        throw new ConflictException('Erro, usuário informado já existe!');
      }
      await this.prisma.appUser.create({
        data: {
          username: createUserDto.username,
          email: createUserDto.email,
          password: await bcrypt.hash(createUserDto.password, 10),
          insUser: createUserDto.insUser,
          updUser: createUserDto.updUser,
          type: createUserDto.type,
        },
      });
      return { message: 'Usuário criado com sucesso!' };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(`Erro ao criar usuário: ${error.message}`);
    }
  }

  /**
   * Busca um usuário pelo seu email.
   * 
   * @param email - O email do usuário.
   * @returns O usuário correspondente ao email fornecido.
   */
  async findByEmail(email: string): Promise<AppUser> {
    return this.prisma.appUser.findUnique({
      where: { email },
    });
  }

  /**
   * Busca um usuário pelo seu ID.
   * 
   * @param id - O ID do usuário.
   * @returns O usuário correspondente ao ID fornecido.
   * @throws NotFoundException se o usuário não for encontrado.
   */
  async getUserById(id: number) {
    const user = await this.prisma.appUser.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário não encontrado!`);
    }
    return user;
  }

  /**
   * Atualiza os dados de um usuário existente.
   * 
   * @param id - O ID do usuário a ser atualizado.
   * @param updateUserDto - Os dados a serem atualizados.
   * @returns Uma mensagem de sucesso se o usuário for atualizado.
   * @throws NotFoundException se o usuário não for encontrado.
   * @throws InternalServerErrorException em caso de erro ao atualizar o usuário.
   */
  async updateUser(id: number, updateUserDto: Partial<CreateUserDto>) {
    try {
      const user = await this.prisma.appUser.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException(`Usuário não encontrado!`);
      }
      await this.prisma.appUser.update({
        where: { id },
        data: {
          username: updateUserDto.username,
          email: updateUserDto.email,
          insUser: updateUserDto.insUser,
          updUser: updateUserDto.updUser,
          type: updateUserDto.type,
        },
      });
      return { message: 'Usuário atualizado com sucesso!' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Erro ao atualizar usuário: ${error.message}`);
    }
  }

  /**
   * Exclui um usuário pelo seu ID.
   * 
   * @param id - O ID do usuário a ser excluído.
   * @returns Uma mensagem de sucesso se o usuário for excluído.
   * @throws NotFoundException se o usuário não for encontrado.
   * @throws InternalServerErrorException em caso de erro ao excluir o usuário.
   */
  async deleteUser(id: number): Promise<any> {
    try {
      const user = await this.prisma.appUser.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException(`Usuário não encontrado!`);
      }
      await this.prisma.appUser.delete({
        where: { id }
      });
      return { message: 'Usuário deletado com sucesso!' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Erro ao deletar usuário: ${error.message}`);
    }
  }

  /**
   * Atualiza a senha de um usuário.
   * 
   * @param id - O ID do usuário.
   * @param newPassword - A nova senha do usuário.
   * @returns Uma mensagem de sucesso se a senha for atualizada.
   * @throws NotFoundException se o usuário não for encontrado.
   */
  async updatePassword(id: number, newPassword: string): Promise<any> {
    try {
      const user = await this.prisma.appUser.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException(`Usuário não encontrado!`);
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await this.prisma.appUser.update({
        where: { id },
        data: { password: hashedPassword, lastPasswordChange: new Date() },
      });
      return { message: 'Senha alterada com sucesso!' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Erro ao alterar senha: ${error.message}`);
    }
  }

  /**
   * Busca todos os usuários na aplicação.
   * 
   * @returns Uma lista de todos os usuários.
   * @throws InternalServerErrorException em caso de erro ao buscar usuários.
   */
  async findAll() {
    try {
      const users = await this.prisma.appUser.findMany();
      if (users.length === 0) {
        return { message: 'Nenhum usuário encontrado!' };
      }
      return users;
    } catch (error) {
      throw new InternalServerErrorException(`Erro ao buscar usuários: ${error.message}`);
    }
  }
}
