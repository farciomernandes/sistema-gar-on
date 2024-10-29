import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';


@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')


  id: string;

  @Column()
  name: string;

  @Column()
  image_link: string;

  @Column({ type: 'text' })
  description: string;

}
