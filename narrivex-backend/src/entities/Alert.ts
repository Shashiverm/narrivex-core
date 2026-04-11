import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User';

@Entity('alerts')
export class Alert {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  symbol!: string;

  @Column()
  ruleType!: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  threshold!: number;

  @Column({ default: 'email' })
  channel!: string;

  @Column({ default: true })
  enabled!: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  lastTriggeredAt!: Date | null;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.alerts, { onDelete: 'CASCADE' })
  user!: User;

  @Column()
  userId!: string;
}