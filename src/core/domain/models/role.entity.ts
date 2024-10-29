
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  
  id: string;

  @Column()
  value: string;

  @Column()
  label: string;

  @OneToMany(() => User, (user) => user.role)
  user: User;

}
