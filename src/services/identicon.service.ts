import { THashedOutput } from '../types/hashHelper.type.js';
import { IIdenticon, IntRange } from '../types/interface.type.js';
import { createCanvas, createImageData } from 'canvas';

function verifyNumber(input: number): IntRange<0, 255> {
  return (input > 0 && input < 255 ? input : 255) as IntRange<0, 255>;
}

const identicon: IIdenticon = {
  getColor(input: THashedOutput) {
    const helperBuffer = Buffer.from(input, 'utf-8');
    console.log(
      'extracting color: ',
      {
        red: verifyNumber(helperBuffer[0]),
        green: verifyNumber(helperBuffer[1]),
        blue: verifyNumber(helperBuffer[2]),
      },
      'with characters being: ',
      {
        0: input.charAt(0),
        1: input.charAt(1),
        2: input.charAt(2),
      },
    );
    return {
      red: verifyNumber(input.charCodeAt(0)),
      green: verifyNumber(input.charCodeAt(1)),
      blue: verifyNumber(input.charCodeAt(2)),
    };
  },

  getImage(input, color, width, height) {
    let counter = 0;
    console.log('got input in image', input);
    const imageData = new Uint8ClampedArray(width * height * 4);
    for (let y = 0; y < height; y++) {
      const line = y * width * 4;
      for (let x = 0; x < width / 2; x++) {
        const pixelCounter = x * 4 + line;
        const mirroredPixel = 40 - (x + 1) * 4 + line;
        console.log(
          'input char is ',
          input.charAt(counter),
          ' and code is ',
          input.charCodeAt(counter),
          ' on counter ' + counter,
        );
        if (input.charCodeAt(counter) % 2 === 0) {
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

    return createImageData(imageData, width, height);
  },

  getIdenticon(input: THashedOutput, width = 10, height = 10) {
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    console.log('created canvas and got 2d context');
    const color = this.getColor(input);

    console.log('got color: ', JSON.stringify(color));

    const imageData = this.getImage(input, color, width, height);

    console.log('got image: ', imageData);

    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.putImageData(imageData, 0, 0);
    const imageString = canvas
      .toDataURL()
      .replace(/^data:image\/\w+;base64,/, '');
    console.log('got image string: ', imageString);
    return Buffer.from(imageString, 'base64');
  },
};

export default identicon;
