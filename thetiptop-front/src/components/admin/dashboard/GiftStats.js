import React from 'react';
import PropTypes from 'prop-types';
import { Box, chakra, Divider, SimpleGrid } from '@chakra-ui/react';
import { FiGift } from 'react-icons/fi';
import { RiGamepadLine } from 'react-icons/ri';
import { ImTicket } from 'react-icons/im';
import { IoBagCheckOutline } from 'react-icons/io5';

import StatsCard from './StatsCard';
import GiftByTypeStats from './GiftByTypeStats';

const GiftStats = ({ giftStats }) => {
  return (
    <Box mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={'center'}
        fontSize={'4xl'}
        py={10}
        fontWeight={'bold'}
      >
        Gift Stats
      </chakra.h1>

      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
        spacing={{ base: 5, lg: 8 }}
      >
        <StatsCard
          title={'Gifts'}
          stat={giftStats.allGifts.total}
          icon={<FiGift size={'3em'} />}
        />
        <StatsCard
          title={'Picked'}
          stat={giftStats.allGifts.amountPicked}
          icon={<ImTicket size={'3em'} />}
        />
        <StatsCard
          title={'Played'}
          stat={giftStats.allGifts.amountPlayed}
          icon={<RiGamepadLine size={'3em'} />}
        />
        <StatsCard
          title={'Checked'}
          stat={giftStats.allGifts.amountCheckedOut}
          icon={<IoBagCheckOutline size={'3em'} />}
        />
      </SimpleGrid>

      <Divider my={'2em'}/>

      <SimpleGrid
        mb={'5'}
        columns={{ base: 1, md: 1, lg: 2 }}
        spacing={{ base: 5, lg: 8 }}
      >
        {giftStats?.giftByType.map((gift, index) => (
          <GiftByTypeStats
            key={index}
            title={gift.typeDisplay}
            total={gift.total}
            amountPicked={gift.amountPicked}
            amountPlayed={gift.amountPlayed}
            amountCheckedOut={gift.amountCheckedOut}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

GiftStats.propTypes = {
  giftStats: PropTypes.object.isRequired,
};

export default GiftStats;
