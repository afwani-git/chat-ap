import { Module } from '@nestjs/common';
import { SessionSerializer } from './sessions.serialize';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  exports: [],
})
export class AuthModule {}
