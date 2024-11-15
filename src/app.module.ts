import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { setEnvironment } from '@/infra/config/enviroments';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './infra/guards/roles.guard';
import { AuthMiddleware } from './infra/middleware/auth.middleware';
import { JwtAdapter } from './infra/adapters/jwt-adapter';
import { Decrypter } from './core/domain/protocols/cryptography/decrypter';
import { RoleModule } from './infra/ioc/role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDataSource } from './infra/db/database.provider';
import { RoleController } from './presentation/controllers/role/role-controller';
import { UserModule } from './infra/ioc/user/user.module';
import { CategoryModule } from './infra/ioc/category/category.module';
import { ProductModule } from './infra/ioc/product/product.module';
import { AuthModule } from './infra/ioc/auth/auth.module';
import { HealthModule } from './infra/ioc/health.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: setEnvironment(),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({}),
      dataSourceFactory: async () => {
        const dataSource = await TypeOrmDataSource.initialize();
        return dataSource;
      },
    }),
    ScheduleModule.forRoot(),
    HealthModule,
    AuthModule,
    RoleModule,
    UserModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [RoleController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: Decrypter,
      useClass: JwtAdapter,
    },
  ],
})
export class AppModule implements NestModule {

  private readonly userEndpoints = [
    { path: 'api/v1/users**', method: RequestMethod.GET },
    { path: 'api/v1/users**', method: RequestMethod.PUT },
    { path: 'api/v1/users**', method: RequestMethod.DELETE },
  ];

  private readonly categoryEndpoints = [
    { path: 'api/v1/categories**', method: RequestMethod.POST },
    { path: 'api/v1/categories**', method: RequestMethod.PUT },
    { path: 'api/v1/categories**', method: RequestMethod.DELETE },
  ];

  private readonly productEndpoints = [
    { path: 'api/v1/products**', method: RequestMethod.POST },
    { path: 'api/v1/products**', method: RequestMethod.PUT },
    { path: 'api/v1/products**', method: RequestMethod.DELETE },
  ];

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        ...this.userEndpoints,
        ...this.categoryEndpoints,
        ...this.productEndpoints,
        { path: 'api/v1/role', method: RequestMethod.ALL },
      );
  }
}
