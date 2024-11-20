import { Repository } from 'typeorm';
import { User } from '@/core/domain/models/user.entity';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import { UpdateUserDto } from '@/presentation/dtos/user/update-user.dto';
import {
  GetAllUsersDto,
  UserModelDto,
  UserParamsDto,
} from '@/presentation/dtos/user/user-model.dto';

export class UserTypeOrmRepository implements UserRepository {
  constructor(private readonly userRepository: Repository<User>) {}
  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
  async update(payload: UpdateUserDto, id: string): Promise<UserModelDto> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id },
      });

      this.userRepository.merge(user, payload);
      const savedUser = await this.userRepository.save(user);
      return UserModelDto.toDto(savedUser);
    } catch (error) {
      throw new Error('User not found');
    }
  }

  async findById(id: string): Promise<UserModelDto> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      return undefined;
    }

    return UserModelDto.toDto(user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getAll(params: UserParamsDto): Promise<GetAllUsersDto> {
    try {
      const queryBuilder = this.userRepository.createQueryBuilder('users');

      queryBuilder.leftJoinAndSelect('users.role', 'role');

      const skip = (params.page - 1) * params.limit;

      const [users, total] = await queryBuilder
        .skip(skip)
        .take(params.limit)
        .getManyAndCount();

      const totalPages = Math.ceil(total / params.limit);

      return {
        users: users.map((user) => UserModelDto.toDto(user)),
        pages: totalPages,
        total,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao buscar usuários.');
    }
  }

  async create(payload: Omit<User, 'id'>): Promise<UserModelDto> {

    const user = this.userRepository.create(payload); 

    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }
}
