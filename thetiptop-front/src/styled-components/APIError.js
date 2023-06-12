import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@chakra-ui/react';

function APIError({ error }) {
  return (
    <>
      {error && (
        <Text py="3" color="tomato">{error}</Text>
      )}
    </>
  );
}

APIError.propTypes = {
  error: PropTypes.string.isRequired,
};

export default APIError;
