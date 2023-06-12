import React from 'react';

import GameWrapper from '../components/home/GameWrapper';
import Modalities from '../components/home/Modalities';
import StepsCircles from '../components/home/StepsCircles';
import Layout from '../components/layout/Layout';
import { Box, Center, Divider } from '@chakra-ui/react';

function Home() {
  return (
    <Layout
      metaTitle="ThéTipTop - Le Jeu Concours"
      width='full'
      withDefaultPadding={false}
    >
      <GameWrapper />
      <Modalities />
      <StepsCircles />
      <Divider />

      <Center as="h2" pb="5" marginTop="40px" marginBottom="20px">
        TIRAGE AU SORT
      </Center>
      <Box bg="brand.main">
        <Box
          as="main"
          backgroundImage={'/img/prize.jpg'}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="100%"
          width="80vw"
          height={{ base: '50vh', md: '70vh', sm: '50vh' }}
          marginLeft="auto"
          marginRight="auto"
        ></Box>
      </Box>
    </Layout>
  );
}

export default Home;
