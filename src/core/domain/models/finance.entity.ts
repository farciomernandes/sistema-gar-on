import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';


@Entity('finances')
export class Financy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  type: string;

  @Column({ type: 'numeric', nullable: true })
  value: number;

  @Column({ nullable: false })
  transaction_date: Date;
}
