export interface ChangelogEntry {
  version: string;
  date: string;
  notes: string[];
}

export const APP_VERSION = '1.0.0';

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '1.0.0',
    date: '2026-04-05',
    notes: [
      'Initial full-stack release scaffold.',
      'OAuth login with GitHub, Google, and credentials.',
      'Realtime charts with websocket updates and narrative cards.',
      'Migration-first backend startup and persisted alert rules.',
      'Docker, Vercel, and Railway deployment configuration.',
    ],
  },
];