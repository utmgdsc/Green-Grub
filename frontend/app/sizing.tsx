import {Dimensions, Platform, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

const BUTTON_BORDERRADIUS = 12;

const TEXT_SMALL = normalize(15);
const TEXT_MEDIUM = normalize(18);
const TEXT_LARGE = normalize(22);
const TEXT_LARGER = normalize(25);
const TEXT_XLARGE = normalize(35);
const TEXT_HUGE = normalize(50);

export {
  BUTTON_BORDERRADIUS,
  TEXT_SMALL,
  TEXT_MEDIUM,
  TEXT_LARGE,
  TEXT_LARGER,
  TEXT_XLARGE,
  TEXT_HUGE,
};
