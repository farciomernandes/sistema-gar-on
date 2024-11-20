import { HashComparer } from '@/core/domain/protocols/cryptography/hash-compare';
import { IHasher } from '@/core/domain/protocols/cryptography/hasher';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcryptjs from 'bcryptjs';
@Injectable()
export class BcryptAdapter implements IHasher, HashComparer {
  private salt: number;

  constructor(private readonly configService: ConfigService) {
    this.salt = Number(configService.get<string>('SALT'));
  }

  async hash(text: string): Promise<string> {
    const hash = await bcryptjs.hash(text, (this.salt) || Number(this.configService.get<string>('SALT') || 12));

    return hash;
  }
  async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await bcryptjs.compare(value, hash);
    return isValid;
  }
}
