import { TibberNode } from './src/nodes/Tibber/Tibber.node';
import { TibberApi } from './src/credentials/TibberApi.credentials';

export const nodes = [
  new TibberNode(),
];

export const credentials = [
  new TibberApi(),
];