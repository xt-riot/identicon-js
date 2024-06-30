import fs from 'fs';

import identicon from './services/identicon.service.js';
import HashingFactory from './factories/hash.factory.js';

const input = 'konstantinos.karachristos@holidayextras.com';

const hasher = new HashingFactory().get_hasher();

const hashedInput = hasher.hashInputVerified(input);

const image = identicon.getIdenticon(hashedInput);

fs.writeFileSync('./image.jpeg', image);
