import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { User } from './User';

@Entity('assets')
@Index(['userId', 'symbol'], { unique: true })
export class Asset {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  symbol!: string;

  @Column()
  name!: string;

  @Column({ default: 'crypto' })
  type!: string;

  @Column({ type: 'numeric', precision: 18, scale: 8, nullable: true })
  lastPrice!: number | null;

  @Column({ nullable: true })
  lastUpdate!: Date | null;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.assets, { onDelete: 'CASCADE' })
  user!: User;

  @Column()
  userId!: string;
}