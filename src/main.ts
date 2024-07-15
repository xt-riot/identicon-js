import { createHash } from 'crypto';

import { buildIdenticonArrayWithLodash, getIdenticonInformation } from './getIdenticon.js';
import { exportToImage } from './exportImage.js';

const identiconWidth = 10;
const identiconHeight = 10;

const input = process.argv[2];

const inputAsHashBuffer = Buffer.from(
  createHash('sha256').update(input).digest('hex').toLowerCase(),
  'utf8',
);

const identiconArrays = {
  custom: getIdenticonInformation(inputAsHashBuffer, identiconWidth, identiconHeight),
  lodash: buildIdenticonArrayWithLodash(inputAsHashBuffer, identiconWidth),
}

exportToImage('jpeg', identiconArrays.custom, identiconWidth, identiconHeight);
