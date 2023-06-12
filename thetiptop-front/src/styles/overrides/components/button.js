const Button = {
  baseStyle: {
    bg: 'brand.green2',
    outline: 'none',
    whiteSpace: 'no-wrap',
    fontWeight: 'bold',
    color: 'grey.700',
    _hover: {
      color: 'white',
      bg: 'brand.green6',
    },
    _active: {
      boxShadow: '0 0 1px 5px green',
    },
    _focus: {
      boxShadow: '0 0 1px 2px green',
    },
  },
  variants: {
    'outline': {
      bg: 'white',
      _hover: {
        bg: 'brand.green4',
        color: 'white',
      },
    },
    'secondary': {
      bg: 'brand.green6',
      color: 'white',
      _hover: { bg: 'brand.primary' },
    },
    'danger': {
      bg: 'red.600',
      color: 'white',
      _hover: {
        bg: 'red.700',
      },
      _active: {
        boxShadow: '0 0 1px 5px red.700',
      },
      _focus: {
        boxShadow: '0 0 1px 2px red.700',
      },
    },
  },
  defaultProps: {
    variant: 'primary',
  },
};

export default Button;
