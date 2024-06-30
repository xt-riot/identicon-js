import { THashedOutput } from './hashHelper.type.js';
import type { ImageData } from 'canvas';

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

export type TColor = {
  red: IntRange<0, 255>;
  green: IntRange<0, 255>;
  blue: IntRange<0, 255>;
};

export interface IIdenticon {
  getColor(input: THashedOutput): TColor;
  getImage(
    input: THashedOutput,
    color: ReturnType<IIdenticon['getColor']>,
    width: number,
    height: number,
  ): ImageData;
  getIdenticon(input: string, width?: number, height?: number): Buffer;
}
