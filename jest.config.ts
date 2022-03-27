import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.tsx?$': `ts-jest`,
    '^.+\\.ts?$': `ts-jest`
  }
};

export default config;
