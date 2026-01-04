import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('campaigns')
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  brandId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  niche: string;

  @Column({ type: 'float' })
  budget: number;

  @Column({ type: 'int' })
  slots: number;

  @Column({ enum: ['draft', 'active', 'closed'], default: 'draft' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}