import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserPasswordResetColumns1712314000000 implements MigrationInterface {
  name = 'AddUserPasswordResetColumns1712314000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS "passwordResetToken" varchar');
    await queryRunner.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS "passwordResetExpiresAt" timestamptz');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE users DROP COLUMN IF EXISTS "passwordResetExpiresAt"');
    await queryRunner.query('ALTER TABLE users DROP COLUMN IF EXISTS "passwordResetToken"');
  }
}