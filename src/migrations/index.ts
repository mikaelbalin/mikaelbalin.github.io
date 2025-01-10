import * as migration_20250110_192849 from './20250110_192849';

export const migrations = [
  {
    up: migration_20250110_192849.up,
    down: migration_20250110_192849.down,
    name: '20250110_192849'
  },
];
