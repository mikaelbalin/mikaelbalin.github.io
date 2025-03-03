import * as migration_20250214_131305 from './20250214_131305';
import * as migration_20250303_225008 from './20250303_225008';

export const migrations = [
  {
    up: migration_20250214_131305.up,
    down: migration_20250214_131305.down,
    name: '20250214_131305',
  },
  {
    up: migration_20250303_225008.up,
    down: migration_20250303_225008.down,
    name: '20250303_225008'
  },
];
