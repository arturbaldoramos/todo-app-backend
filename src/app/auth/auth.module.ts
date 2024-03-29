import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../strategies/jwt-strategy';
import { LocalStrategy } from '../strategies/local.strategy';
import 'dotenv/config'
import { LoginValidationMiddleware } from '../middlewares/login-validation.middleware';
require('dotenv').config()

@Module({
  imports: [UserModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '2d' }
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
