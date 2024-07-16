import _ from 'lodash';

type TColor = {
  red: number;
  green: number;
  blue: number;
};

function getColor(input: number[]): TColor {
  const [red, green, blue] = input;
  return { red, green, blue };
}

export function buildIdenticonArray(input: number[], width: number, height: number) {
  const limitedArray = _.take(input, Math.ceil((width * height) / 2));
  const binaryRepresentation = _.map(limitedArray, value => (value % 2 === 0 ? 1 : 0));
  const lineChunks = _.chunk(binaryRepresentation, width / 2);
  const identiconArray = _.flatMap(lineChunks, array => [...array, ...array.reverse()]);

  return {
    color: getColor(limitedArray),
    data: identiconArray
  };
}
