import { Injectable } from '@nestjs/common';
import { S3DeleteImage } from './s3-delete-image';
import { S3UploadImage } from './s3-upload-image';

@Injectable()
export abstract class S3Repository implements S3UploadImage, S3DeleteImage {
  abstract saveFile(
    file: any,
    bucket?: string,
  ): Promise<string>;

  abstract deleteBucket(object_key: string): Promise<void>;
}
