import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { env } from './common/env/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: env.FRONTEND_URLS,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  app.use('/docs', (req: any, res: any, next: any) => {
    const auth = req.headers['authorization'];
    const expected =
      'Basic ' +
      Buffer.from(`${env.SWAGGER_USER}:${env.SWAGGER_PASSWORD}`).toString(
        'base64',
      );

    if (auth === expected) return next();

    res.set('WWW-Authenticate', 'Basic realm="Swagger"');
    res.status(401).send('Unauthorized');
  });

  const config = new DocumentBuilder()
    .setTitle(env.APP_NAME)
    .setDescription('YOUR APPLICATION DESCRIPTION')
    .setVersion('1.0')
    .addTag('app')
    .addBearerAuth()
    .build();

  if (process.env.NODE_ENV !== 'production') {
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(env.PORT);
}
bootstrap()
  .then(() => console.log('Listening on port PORT'))
  .catch((err) => console.log(err));
