import * as migration_20250214_131305 from './20250214_131305';
import * as migration_20250304_112448 from './20250304_112448';

export const migrations = [
  {
    up: migration_20250214_131305.up,
    down: migration_20250214_131305.down,
    name: '20250214_131305',
  },
  {
    up: migration_20250304_112448.up,
    down: migration_20250304_112448.down,
    name: '20250304_112448'
  },
];
