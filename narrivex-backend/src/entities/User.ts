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

  @Column({ type: 'varchar', nullable: true })
  password!: string | null;

  @Column({ type: 'varchar', nullable: true })
  image!: string | null;

  @Column({ type: 'varchar', nullable: true })
  githubId!: string | null;

  @Column({ type: 'varchar', nullable: true })
  googleId!: string | null;

  @Column({ default: true })
  emailNotifications!: boolean;

  @Column({ type: 'varchar', nullable: true })
  slackWebhookUrl!: string | null;

  @Column({ type: 'varchar', nullable: true })
  passwordResetToken!: string | null;

  @Column({ nullable: true, type: 'timestamp' })
  passwordResetExpiresAt!: Date | null;

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