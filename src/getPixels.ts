type TColor = {
  red: number;
  green: number;
  blue: number;
};

function getColor(input: Buffer): TColor {
  return {
    red: input[0],
    green: input[1],
    blue: input[2],
  };
}

export function getPixelsArray(input: Buffer, width: number, height: number) {
  const color = getColor(input);

  let counter = 0;
  const imageData = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++) {
    const line = y * width * 4;
    for (let x = 0; x < width / 2; x++) {
      const pixelCounter = x * 4 + line;
      const mirroredPixel = 40 - (x + 1) * 4 + line;

      if (input[counter] % 2 === 0) {
        imageData[pixelCounter] = color.red;
        imageData[pixelCounter + 1] = color.green;
        imageData[pixelCounter + 2] = color.blue;
        imageData[pixelCounter + 3] = 255;

        imageData[mirroredPixel] = color.red;
        imageData[mirroredPixel + 1] = color.green;
        imageData[mirroredPixel + 2] = color.blue;
        imageData[mirroredPixel + 3] = 255;
      } else {
        imageData[pixelCounter] = 0;
        imageData[pixelCounter + 1] = 0;
        imageData[pixelCounter + 2] = 0;
        imageData[pixelCounter + 3] = 255;

        imageData[mirroredPixel] = 0;
        imageData[mirroredPixel + 1] = 0;
        imageData[mirroredPixel + 2] = 0;
        imageData[mirroredPixel + 3] = 255;
      }
      counter++;
    }
  }

  return imageData;
}
