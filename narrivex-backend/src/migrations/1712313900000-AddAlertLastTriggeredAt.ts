import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAlertLastTriggeredAt1712313900000 implements MigrationInterface {
  name = 'AddAlertLastTriggeredAt1712313900000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE alerts ADD COLUMN IF NOT EXISTS "lastTriggeredAt" timestamptz');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE alerts DROP COLUMN IF EXISTS "lastTriggeredAt"');
  }
}