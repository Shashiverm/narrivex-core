import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Asset } from '../entities/Asset';
import { Alert } from '../entities/Alert';
import { Narrative } from '../entities/Narrative';

const isProduction = process.env.NODE_ENV === 'production';
const isTsRuntime = __filename.endsWith('.ts');
const dbPort = Number.parseInt(process.env.DB_PORT || '5432', 10);
const dbPassword = process.env.DB_PASSWORD || (isProduction ? '' : 'password');

if (isProduction && !dbPassword) {
  throw new Error('DB_PASSWORD must be set in production');
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number.isNaN(dbPort) ? 5432 : dbPort,
  username: process.env.DB_USER || 'postgres',
  password: dbPassword,
  database: process.env.DB_NAME || 'narrivex',
  synchronize: process.env.DB_SYNC === 'true' && process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Asset, Alert, Narrative],
  migrations: [isTsRuntime ? 'src/migrations/*.ts' : 'dist/migrations/*.js'],
});

export async function initializeDatabase() {
  await AppDataSource.initialize();
}

export async function runMigrations() {
  await AppDataSource.runMigrations();
}