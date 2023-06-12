import React from 'react';
import PropTypes from 'prop-types';
import { VStack, Heading, Text } from '@chakra-ui/react';

const ApiErrorMessage = ({ apiError }) => {
  return (
    <>
      {apiError?.status?.length ? (
      <VStack spacing='5' bg='gray.100' p='5' rounded='lg' mb='2'>
        <Heading color='brand.red'>
          Ooops...une erreur sauvage apparaît !
        </Heading>
        <Text fontSize='xl'>{apiError.status} - {apiError.statusText}</Text>
        <Text fontSize='md'>{apiError.content}</Text>
      </VStack>
      ) : null }
    </>
  );
};

ApiErrorMessage.propTypes = {
  apiError: PropTypes.shape({
    status: PropTypes.number,
    statusText: PropTypes.string,
    content: PropTypes.string,
  }),
};

export { ApiErrorMessage };
