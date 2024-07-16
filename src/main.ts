import { createHash } from 'crypto';

import { buildIdenticonArray } from './getIdenticon.js';
import { exportToImage } from './exportImage.js';

const identiconWidth = 10;
const identiconHeight = 10;

const input = process.argv[2];

const inputAsHashBuffer = createHash('sha256').update(input).digest().toJSON().data;

const identiconArray = buildIdenticonArray(inputAsHashBuffer, identiconWidth, identiconHeight);

exportToImage('jpeg', identiconArray, identiconWidth, identiconHeight);
