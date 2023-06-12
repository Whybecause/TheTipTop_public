import React from 'react';
import Proptypes from 'prop-types';
import { CloseIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading } from '@chakra-ui/react';

const ErrorMessage = ({ content }) => {
  return (
    <Box
      flex="1" justifyContent={'center'} alignItems="center" display="flex"
    >
      <Box textAlign="center" py={10} px={6}
      >
        <Box display="inline-block">
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            bg={'red.500'}
            rounded={'50px'}
            w={'55px'}
            h={'55px'}
            textAlign="center">
            <CloseIcon boxSize={'20px'} color={'white'} />
          </Flex>
        </Box>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          {content}
        </Heading>
      </Box>
    </Box>
  );
};

ErrorMessage.propTypes = {
  content: Proptypes.string.isRequired,
};

export default ErrorMessage;
