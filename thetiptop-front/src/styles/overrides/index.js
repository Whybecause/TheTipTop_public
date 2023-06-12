import { extendTheme } from '@chakra-ui/react';

import { Button } from './components';
import { colors, fonts } from './foundations';
import styles from './styles';

const overrides = {
  styles,
  colors,
  fonts,
  components: { Button },
};

export default extendTheme(overrides);
