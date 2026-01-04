import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('creators')
export class Creator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ type: 'int', default: 0 })
  followers: number;

  @Column({ type: 'float', default: 0 })
  engagement: number;

  @Column('simple-array', { nullable: true })
  niches: string[];

  @Column('simple-array', { nullable: true })
  platforms: string[];

  @Column({ type: 'float', nullable: true })
  rate: number;

  @Column({ default: false })
  verified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}