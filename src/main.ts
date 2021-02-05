import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { getConnection } from 'typeorm';
import { AppModule } from './app.module';

import * as session from 'express-session';
import flash = require('connect-flash');
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('pug');
  app.use(
    session({
      secret: 'nest cats',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  const connection = getConnection('default');

  console.log(connection.isConnected ? 'db connected' : 'db not connected');

  await app.listen(3000);
}
bootstrap();
