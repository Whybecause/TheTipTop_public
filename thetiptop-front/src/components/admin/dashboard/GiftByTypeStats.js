import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Center,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';

import { prettifyGiftType } from '../../../helpers/prettifyGiftType';

function GiftByTypeStats({
  title,
  total,
  amountPicked,
  amountPlayed,
  amountCheckedOut,
}) {
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor='gray.800'
      rounded={'lg'}>
      <Center>
        <Avatar alt="gift-type" size="xs" src={`/img/${title}.jpg`} />
        &nbsp;
        {prettifyGiftType(title)}
      </Center>
      <SimpleGrid columns={4} pt={'1em'} pl={{ base: 2, md: 4 }}>
        <Box>
          <StatLabel fontWeight={'medium'} istruncated="true">
            Total
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {total}
          </StatNumber>
        </Box>
        <Box>
          <StatLabel fontWeight={'medium'} istruncated="true">
            Picked
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {amountPicked}
          </StatNumber>
        </Box>
        <Box>
          <StatLabel fontWeight={'medium'} istruncated="true">
            Played
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {amountPlayed}
          </StatNumber>
        </Box>
        <Box>
          <StatLabel fontWeight={'medium'} istruncated="true">
            Checked
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {amountCheckedOut}
          </StatNumber>
        </Box>
      </SimpleGrid>
    </Stat>
  );
}

GiftByTypeStats.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  amountPicked: PropTypes.number.isRequired,
  amountPlayed: PropTypes.number.isRequired,
  amountCheckedOut: PropTypes.number.isRequired,
};


export default GiftByTypeStats;
