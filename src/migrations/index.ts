import * as migration_20250304_080943 from './20250304_080943';

export const migrations = [
  {
    up: migration_20250304_080943.up,
    down: migration_20250304_080943.down,
    name: '20250304_080943'
  },
];
