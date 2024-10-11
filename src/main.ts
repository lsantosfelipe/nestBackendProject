
/**
 * Função de inicialização da aplicação.
 * 
 * Esta função cria uma instância da aplicação utilizando o módulo principal
 * (AppModule) e configura os pipes globais para validação de dados. O
 * ValidationPipe é configurado para:
 * 
 * - `whitelist`: filtrar propriedades que não estão no DTO.
 * - `forbidNonWhitelisted`: proibir a entrada de propriedades não permitidas.
 * - `transform`: transformar os dados recebidos em suas instâncias de DTO correspondentes.
 * 
 * A função também habilita CORS (Cross-Origin Resource Sharing) e inicia o
 * servidor na porta 3000.
 * 
 * Autores: [Filipe Santos Lima, Luiz Augusto Mendes Barbosa, Marcos Cabral Barbosa].
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, 
    transform: true,
  }));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();