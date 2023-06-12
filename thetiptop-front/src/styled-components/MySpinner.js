import { Box, Spinner, Text } from '@chakra-ui/react';
import React from 'react';

function MySpinner() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py='4em'
    >
      <Spinner size="lg" color='brand.green2'/>
      <Text>Chargement des résulats...</Text>
    </Box>
  );
}

export default MySpinner;
