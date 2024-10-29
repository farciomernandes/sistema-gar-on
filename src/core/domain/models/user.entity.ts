import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  document: string;

  @Column()
  sex: string;

  @Column()
  birthdate: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  role_id: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

}

