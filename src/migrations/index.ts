import * as migration_20250110_201408 from './20250110_201408';

export const migrations = [
  {
    up: migration_20250110_201408.up,
    down: migration_20250110_201408.down,
    name: '20250110_201408'
  },
];
