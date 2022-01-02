import {Dimensions} from 'react-native';

export const useConstants = () => {
  const dim = Dimensions.get('screen');

  return {
    dim,
    links: {
      github: 'https://github.com/tate2301/24DevApp',
      website: 'https://chris.co.zw',
    },
  };
};
