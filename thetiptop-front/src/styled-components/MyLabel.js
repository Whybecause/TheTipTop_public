import React from 'react';
import PropTypes from 'prop-types';
import { Box, FormLabel } from '@chakra-ui/react';

const MyLabel = ({
  label,
  labelColor,
  htmlFor,
  isRequired,
  displayStar = isRequired,
}) => {
  return (
    <FormLabel
      color={labelColor}
      htmlFor={htmlFor}
      fontWeight="bold"
      whiteSpace="nowrap"
    >
      {label} {isRequired && displayStar &&
        <Box as="span" color="tomato">*</Box>
      }
    </FormLabel>
  );
};

MyLabel.propTypes = {
  label: PropTypes.string.isRequired,
  labelColor: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  displayStar: PropTypes.bool,
};

export default MyLabel;
