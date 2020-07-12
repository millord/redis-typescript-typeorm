import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;
}