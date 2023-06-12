import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  chakra,
  SimpleGrid,
} from '@chakra-ui/react';
import { BsPerson } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';

import StatsCard from './StatsCard';

function UserStats({ userStats }) {
  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={'center'}
        fontSize={'4xl'}
        py={10}
        fontWeight={'bold'}>
      User Stats
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={'Users'}
          stat={userStats.totalUsers}
          icon={<BsPerson size={'3em'} />}
        />
        <StatsCard
          title={'Accepted Newsletter'}
          stat={userStats.totalAcceptedNewsletter}
          icon={<HiOutlineMail size={'3em'} />}
        />
      </SimpleGrid>
    </Box>
  );
}

UserStats.propTypes = {
  userStats: PropTypes.object.isRequired,
};

export default UserStats;
