import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { promises as fsPromises } from 'fs';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Repository } from '@/core/domain/protocols/aws/s3-repository';

@Injectable()
export class S3Storage implements S3Repository {
  private client: AWS.S3;

  constructor(private readonly configService: ConfigService) {
    this.client = new AWS.S3({
      region: configService.get<string>('SISTEMA_GARÇOM__AWS_REGION'),
      accessKeyId: configService.get<string>(
        'SISTEMA_GARÇOM__AWS_ACCESS_KEY_ID',
      ),
      secretAccessKey: configService.get<string>(
        'SISTEMA_GARÇOM__AWS_SECRET_KEY',
      ),
    });
  }

  async saveFile(file: any, bucket?: string): Promise<string> {
    try {
      const { filename, mimetype, path } = file;

      if (!bucket) {
        bucket = this.configService.get<string>(
          'SISTEMA_GARÇOM__AWS_BUCKET',
        );
      }

      const fileContent = await fsPromises.readFile(path);

      await this.client
        .putObject({
          Bucket: bucket,
          Key: filename,
          ACL: 'public-read',
          Body: fileContent,
          ContentType: mimetype,
        })
        .promise();

      await fsPromises.unlink(path);

      const objectUrl = `https://${bucket}.s3.${this.client.config.region}.amazonaws.com/${filename}`;

      return objectUrl;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro ao salvar o arquivo no S3');
    }
  }

  async deleteBucket(object_key: string): Promise<void> {
    const name = object_key.match(/([^\/]+)$/)[0];

    try {
      await this.client
        .deleteObject({
          Bucket: this.configService.get<string>(
            'SISTEMA_GARÇOM__AWS_BUCKET',
          ),
          Key: name,
        })
        .promise();
    } catch (error) {
      console.error('Erro ao excluir o bucket:', error);
      throw new InternalServerErrorException('Erro ao excluir o bucket do S3');
    }
  }
}
