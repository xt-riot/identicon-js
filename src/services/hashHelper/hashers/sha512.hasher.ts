import { TUnVerifiedOutput } from '../../../types/hashHelper.type.js';
import { createHash } from 'crypto';

export function sha2_512_hasher(input: string): TUnVerifiedOutput {
  return createHash('sha512').update(input).digest('hex') as TUnVerifiedOutput;
}
