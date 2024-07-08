import sha3 from 'js-sha3';

import { getIdenticonInformation } from './getPixels.js';
import { exportAsJpeg } from './exportImage.js';

const identiconWidth = 10;
const identiconHeight = 10;

const input = 'konstantinos.karachristos@holidayextras.com';

const inputAsHashBuffer = Buffer.from(
  sha3.sha3_512(input).toLowerCase(),
  'utf8',
);

const image = getIdenticonInformation(inputAsHashBuffer, identiconWidth, identiconHeight);

exportAsJpeg(image, identiconWidth, identiconHeight);
