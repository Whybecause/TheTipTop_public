import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Stat, StatLabel, StatNumber } from '@chakra-ui/react';

function StatsCard({ title, stat, icon }) {
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor='gray.800'
      rounded={'lg'}>
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} istruncated="true">
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color='gray.800'
          alignContent={'center'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  stat: PropTypes.number.isRequired,
  icon: PropTypes.object.isRequired,
};


export default StatsCard;
