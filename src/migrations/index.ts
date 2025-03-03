import * as migration_20250303_232905 from './20250303_232905';

export const migrations = [
  {
    up: migration_20250303_232905.up,
    down: migration_20250303_232905.down,
    name: '20250303_232905'
  },
];
