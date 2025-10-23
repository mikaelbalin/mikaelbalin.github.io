import * as migration_20250406_141334 from './20250406_141334';
import * as migration_20250414_171557 from './20250414_171557';
import * as migration_20250414_174811 from './20250414_174811';
import * as migration_20250729_210554 from './20250729_210554';
import * as migration_20251023_145843 from './20251023_145843';

export const migrations = [
  {
    up: migration_20250406_141334.up,
    down: migration_20250406_141334.down,
    name: '20250406_141334',
  },
  {
    up: migration_20250414_171557.up,
    down: migration_20250414_171557.down,
    name: '20250414_171557',
  },
  {
    up: migration_20250414_174811.up,
    down: migration_20250414_174811.down,
    name: '20250414_174811',
  },
  {
    up: migration_20250729_210554.up,
    down: migration_20250729_210554.down,
    name: '20250729_210554',
  },
  {
    up: migration_20251023_145843.up,
    down: migration_20251023_145843.down,
    name: '20251023_145843'
  },
];
