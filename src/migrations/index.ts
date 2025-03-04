import * as migration_20250304_091316 from './20250304_091316';

export const migrations = [
  {
    up: migration_20250304_091316.up,
    down: migration_20250304_091316.down,
    name: '20250304_091316'
  },
];
