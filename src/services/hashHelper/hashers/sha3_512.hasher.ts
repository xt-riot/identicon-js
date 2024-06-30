import { TUnVerifiedOutput } from '../../../types/hashHelper.type.js';
import sha3 from 'js-sha3';

export function sha3_512_hasher(input: string): TUnVerifiedOutput {
  return sha3.sha3_512(input).toLowerCase() as TUnVerifiedOutput;
}
