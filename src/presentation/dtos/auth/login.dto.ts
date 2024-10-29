import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    example: 'any@mail.com',
    description: 'Email utilizado para fazer login no sistema',
    required: true,
  })
  @IsEmail()
  @Expose()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'password',
    description: 'Senha utilizada para fazer login no sistema',
  })
  @IsString()
  @MinLength(8)
  password: string;
}

export class AuthenticatedDto {
  @ApiProperty({
    type: String,
    example: '12345678900',
    required: true,
  })
  @Expose()
  access_token: string;

  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  @IsString()
  name: string;
}
