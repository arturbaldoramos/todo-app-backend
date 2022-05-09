import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './app/auth/auth.module';
import { TodoModule } from './app/todo.modules';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './app/guards/jwt-auth.guards';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configServise: ConfigService) => ({
      type: 'mariadb',
      host: configServise.get('DB_HOST'),
      port: Number(configServise.get('DB_PORT')),
      username: configServise.get('DB_USERNAME'),
      password: configServise.get('DB_PASSWORD'),
      database: configServise.get('DB_DATABASE'),
      entities: [__dirname + '/**/*.entity{.js, .ts}'],
      synchronize: true,
    })
  }),
    TodoModule,
    AuthModule,
  ],

  controllers: [],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },],
})
export class AppModule { }
