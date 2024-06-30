import { sha2_512_hasher } from './../services/hashHelper/hashers/sha512.hasher.js';
import { sha3_512_hasher } from '../services/hashHelper/hashers/sha3_512.hasher.js';
import { THashedOutput, TUnVerifiedOutput } from '../types/hashHelper.type.js';

export default class HashingFactory {
  private sha3_512: typeof sha2_512_hasher;
  private sha2_512: typeof sha2_512_hasher;

  constructor() {
    this.sha3_512 = sha3_512_hasher;
    this.sha2_512 = sha2_512_hasher;
  }

  public get_hasher() {
    return new Hasher(this.sha3_512);
  }

  public get_sha2_512_hasher() {
    return new Hasher(this.sha2_512);
  }

  public get_sha3_512_hasher() {
    return new Hasher(this.sha3_512);
  }
}

class Hasher {
  private hasher: (input: string) => TUnVerifiedOutput;

  constructor(hasher: typeof this.hasher) {
    this.hasher = hasher;
  }

  public hashInputVerified(input: string): THashedOutput {
    let hashed = this.hasher(input);

    while (!this.verifyHashOutput(hashed)) {
      hashed = this.hasher(input);
    }

    return hashed;
  }

  private verifyHashOutput(
    output: TUnVerifiedOutput | THashedOutput,
  ): output is THashedOutput {
    return output.length >= 50;
  }
}
