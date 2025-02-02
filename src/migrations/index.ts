import * as migration_20250110_201408 from './20250110_201408';
import * as migration_20250202_181958 from './20250202_181958';

export const migrations = [
  {
    up: migration_20250110_201408.up,
    down: migration_20250110_201408.down,
    name: '20250110_201408',
  },
  {
    up: migration_20250202_181958.up,
    down: migration_20250202_181958.down,
    name: '20250202_181958'
  },
];
