import { DataSource } from 'typeorm';
import { join } from 'path';
import { Env } from '../config/enviroments';

export const TypeOrmDataSource = new DataSource({
  type: 'sqlite',
  database: Env.SISTEMA_GARCOM_DB_NAME,
  synchronize: true,
  logger: 'simple-console',
  entities: [join(__dirname, 'typeorm/schemas/*.schema.{js,ts}')],
  migrationsTableName: 'migrations',
  migrations: [join(__dirname, 'typeorm/migrations/*.{js,ts}')],
});
