import { Module } from '@nestjs/common';
import { S3Storage } from '../proxy/s3-storage';
import { S3Repository } from '@/core/domain/protocols/aws/s3-repository';

@Module({
  imports: [S3Storage],
  providers: [
    {
      provide: S3Repository,
      useClass: S3Storage,
    },
  ],
  exports: [S3Storage],
})
export class S3StorageModule {}
