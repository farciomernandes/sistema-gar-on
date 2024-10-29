import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { IRoleSeed } from '@/core/domain/protocols/db/role/seed-role';
import { Logger } from '@nestjs/common';

async function seed() {
  const logger = new Logger(seed.name);

  const app = await NestFactory.create(AppModule);

  try {
    logger.log('Start seeds');
    const roleSeedSeedService = app.get(IRoleSeed);
    await roleSeedSeedService.seedRoles();
    logger.log('Roles is ready');
    logger.log('Seeding completed successfully');
  } catch (error) {
    logger.error('Error during seeding:', error);
  } finally {
    await app.close();
  }
}

seed();
