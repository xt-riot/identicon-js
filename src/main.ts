import sha3 from 'js-sha3';

import { getIdenticonInformation } from './getPixels.js';
import { exportToImage } from './exportImage.js';

const identiconWidth = 10;
const identiconHeight = 10;

const input = process.argv[2];

const inputAsHashBuffer = Buffer.from(
  sha3.sha3_512(input).toLowerCase(),
  'utf8',
);

const image = getIdenticonInformation(inputAsHashBuffer, identiconWidth, identiconHeight);

exportToImage('jpeg', image, identiconWidth, identiconHeight);
