import {Dimensions, Platform, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalizeFont(size: number) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export const randomNum = (max = 100): number => Math.floor(Math.random() * max);

export const getQuestionWordPosition = (word: string, sentence: string) => {
  return {
    start: sentence.indexOf(word),
    end: word.length,
  };
};

export const fillDashes = (len: number) => {
  return ' ' + Array(len).fill('_').join('') + ' ';
};
