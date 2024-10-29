import { User } from '@/core/domain/models/user.entity';

export abstract class IDbFindUserByEmailRepository {
  abstract findByEmail(email: string): Promise<User>;
}
