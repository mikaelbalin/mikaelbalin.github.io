import * as migration_20250214_131305 from './20250214_131305';

export const migrations = [
  {
    up: migration_20250214_131305.up,
    down: migration_20250214_131305.down,
    name: '20250214_131305'
  },
];
