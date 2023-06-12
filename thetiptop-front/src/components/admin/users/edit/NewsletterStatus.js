import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';


const NewsletterStatus = ({ hasAcceptedNewsletter }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" pb='2em'>
      <Box display="inline-block" mr='3'>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={hasAcceptedNewsletter ? 'brand.green2' : 'red.500'}
          rounded={'50px'}
          w={'35px'}
          h={'35px'}
          textAlign="center"
        >
          {hasAcceptedNewsletter ? (
              <CheckIcon boxSize={'15px'} color={'white'} />
              ) : (
              <CloseIcon boxSize={'15px'} color={'white'} />
            )}
        </Flex>
      </Box>
      {hasAcceptedNewsletter ? (
          <Text>Newsletter : Inscris</Text>
        ) : (
          <Text>Newsletter : Non Inscris</Text>
        )}
    </Box>

  );
};

NewsletterStatus.propTypes = {
  hasAcceptedNewsletter: PropTypes.bool.isRequired,
};

export default NewsletterStatus;
