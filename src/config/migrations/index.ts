import * as migration_20250406_141334 from './20250406_141334';
import * as migration_20250414_171557 from './20250414_171557';

export const migrations = [
  {
    up: migration_20250406_141334.up,
    down: migration_20250406_141334.down,
    name: '20250406_141334',
  },
  {
    up: migration_20250414_171557.up,
    down: migration_20250414_171557.down,
    name: '20250414_171557'
  },
];
