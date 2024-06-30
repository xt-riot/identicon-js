import { createHash } from 'crypto';

export function sha2_512_hasher(input: string) {
  return createHash('sha512').update(input).digest('hex');
}
