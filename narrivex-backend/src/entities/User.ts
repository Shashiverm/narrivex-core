import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Asset } from './Asset';
import { Alert } from './Alert';
import { Narrative } from './Narrative';

@Entity('users')
@Index(['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  password!: string | null;

  @Column({ nullable: true })
  image!: string | null;

  @Column({ nullable: true })
  githubId!: string | null;

  @Column({ nullable: true })
  googleId!: string | null;

  @Column({ default: true })
  emailNotifications!: boolean;

  @Column({ nullable: true })
  slackWebhookUrl!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Asset, (asset) => asset.user)
  assets!: Asset[];

  @OneToMany(() => Alert, (alert) => alert.user)
  alerts!: Alert[];

  @OneToMany(() => Narrative, (narrative) => narrative.user)
  narratives!: Narrative[];
}