import sha3 from 'js-sha3';

export function sha3_512_hasher(input: string) {
  return sha3.sha3_512(input).toLowerCase();
}
