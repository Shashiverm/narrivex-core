import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { User } from './User';

@Entity('narratives')
@Index(['userId', 'symbol', 'createdAt'])
export class Narrative {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  symbol!: string;

  @Column({ type: 'text' })
  text!: string;

  @Column({ default: 'neutral' })
  sentiment!: 'bullish' | 'bearish' | 'neutral';

  @Column({ type: 'float', default: 0.5 })
  confidence!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.narratives, { onDelete: 'CASCADE' })
  user!: User;

  @Column()
  userId!: string;
}