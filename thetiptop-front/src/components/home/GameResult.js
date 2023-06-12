import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Slide,
  Text,
  Heading,
  Spacer,
  VStack,
} from '@chakra-ui/react';

import { prettifyGiftType } from '../../helpers/prettifyGiftType';
import GiftCard from '../dashboard/user/GiftCard';

function GameResult({ gift, isOpen, onToggle }) {
  return (
    <Slide direction='bottom' in={isOpen} style={{ zIndex: 10 }}>
      <Box
        h='100vh'
        color='white'
        bg='brand.green2'
        rounded='md'
        shadow='md'
      >
        <VStack
          h="100vh"
          spacing={5}
          alignItems="center"
          justifyContent="center"
          display="flex"
        >
          <Spacer />
          <Heading>Félicitations ! Vous avez gagné</Heading>
          <Text fontSize="3em">{prettifyGiftType(gift?.typeDisplay)}</Text>
          <GiftCard gift={gift} type='game'/>
          <Spacer />
          <Box
            onClick={onToggle}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="brand.green4"
            h='50px'
            w='50px'
            rounded='full'
          >
            <CloseIcon color="white" />
          </Box>
        </VStack>
      </Box>
    </Slide>
  );
};

GameResult.propTypes = {
  gift: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default GameResult;
