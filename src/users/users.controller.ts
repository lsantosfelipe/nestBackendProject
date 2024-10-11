/**
 * UsersController é o controlador responsável por gerenciar as operações relacionadas aos usuários na aplicação.
 * Ele fornece as seguintes rotas:
 *
 * - POST /users/login: Realiza o login do usuário. Recebe um LoginDto contendo o email e a senha.
 * - POST /users: Cria um novo usuário. Protegido por autenticação JWT.
 * - GET /users/:id: Retorna as informações de um usuário específico. Protegido por autenticação JWT.
 * - DELETE /users/:id: Remove um usuário específico. Protegido por autenticação JWT.
 * - PUT /users/:id: Atualiza as informações de um usuário específico. Protegido por autenticação JWT.
 * - GET /users: Retorna todos os usuários. Protegido por autenticação JWT.
 * - POST /users/password/:id: Atualiza a senha do usuário específico.
 * 
 * Autores: [Filipe Santos Lima, Luiz Augusto Mendes Barbosa, Marcos Cabral Barbosa].
*/
import {Controller, Post, Body, Get, Param, Put, Delete, UseGuards, UnauthorizedException} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
      return this.usersService.login(loginDto.email, loginDto.password);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
      return this.usersService.createUser(createUserDto);
    }
    
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getUser(@Param('id') id: string) {
      return this.usersService.getUserById(Number(id));
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
      return this.usersService.deleteUser(+id);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateUser(@Param('id') id: string, @Body() updateUserDto: Partial<CreateUserDto>) {
      return this.usersService.updateUser(Number(id), updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAllUsers() {
      return this.usersService.findAll();
    }

    @Post('password/:id')
    async changePassword(@Param('id') id: string, @Body() body: { password: string }) {
      return this.usersService.updatePassword(Number(id), body.password);
    }
  }