import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const CloseButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      colorScheme="red">
      <Icon as={CloseIcon}/>
    </Button>
  );
};

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CloseButton;
