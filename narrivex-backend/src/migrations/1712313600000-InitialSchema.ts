import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1712313600000 implements MigrationInterface {
  name = 'InitialSchema1712313600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS users (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        name varchar NOT NULL,
        email varchar NOT NULL UNIQUE,
        password varchar,
        image varchar,
        "githubId" varchar,
        "googleId" varchar,
        "emailNotifications" boolean NOT NULL DEFAULT true,
        "slackWebhookUrl" varchar,
        "createdAt" timestamptz NOT NULL DEFAULT now(),
        "updatedAt" timestamptz NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS assets (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        symbol varchar NOT NULL,
        name varchar NOT NULL,
        type varchar NOT NULL DEFAULT 'crypto',
        "lastPrice" numeric(18,8),
        "lastUpdate" timestamptz,
        "createdAt" timestamptz NOT NULL DEFAULT now(),
        "userId" uuid NOT NULL,
        CONSTRAINT fk_assets_user FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await queryRunner.query('CREATE UNIQUE INDEX IF NOT EXISTS idx_assets_user_symbol ON assets ("userId", symbol)');

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS alerts (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        symbol varchar NOT NULL,
        "ruleType" varchar NOT NULL,
        threshold numeric(10,2) NOT NULL,
        channel varchar NOT NULL DEFAULT 'email',
        enabled boolean NOT NULL DEFAULT true,
        "createdAt" timestamptz NOT NULL DEFAULT now(),
        "userId" uuid NOT NULL,
        CONSTRAINT fk_alerts_user FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS narratives (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        symbol varchar NOT NULL,
        text text NOT NULL,
        sentiment varchar NOT NULL DEFAULT 'neutral',
        confidence float8 NOT NULL DEFAULT 0.5,
        "createdAt" timestamptz NOT NULL DEFAULT now(),
        "userId" uuid NOT NULL,
        CONSTRAINT fk_narratives_user FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS idx_narratives_user_symbol_created_at ON narratives ("userId", symbol, "createdAt")'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX IF EXISTS idx_narratives_user_symbol_created_at');
    await queryRunner.query('DROP TABLE IF EXISTS narratives');
    await queryRunner.query('DROP TABLE IF EXISTS alerts');
    await queryRunner.query('DROP INDEX IF EXISTS idx_assets_user_symbol');
    await queryRunner.query('DROP TABLE IF EXISTS assets');
    await queryRunner.query('DROP TABLE IF EXISTS users');
  }
}