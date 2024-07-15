import _ from 'lodash';

type TColor = {
  red: number;
  green: number;
  blue: number;
};

function getColor(input: number[]): TColor {
  return {
    red: input[0],
    green: input[1],
    blue: input[2],
  };
}

export function getIdenticonInformation(input: number[], width: number, height: number) {
  return {
    color: getColor(input),
    // eslint-disable-next-line prefer-spread
    data: Array.apply(null, Array(width * height)).map((_, index) => {
      if (index % width === index % Math.floor(width / 2)) {
        return input[index % Math.floor(width/2) + Math.floor((index / width)) / 2 * height] % 2 === 0 ? 1 : 0;
      }
      return input[width - 1 - index + width * Math.floor((index / width)) * 3 / 2] % 2 === 0 ? 1 : 0;
    })
  }
}

export function buildIdenticonArrayWithLodash(input: number[], width: number) {
  return {
    color: getColor(input),
    data: _.chain(input)
            .chunk(width / 2)
            .flatMap(array => [...array, ...array.reverse()].map(value => value % 2 === 0 ? 1 : 0))
            .value()
  }
}
