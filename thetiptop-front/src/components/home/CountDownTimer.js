import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';

import { useCountdown } from '../../hooks/useCountDown';
import { handlePlural } from '../../helpers/handlePlural';

function CountDownTimer({ targetDate }) {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  return (
    <Box
      as="section"
      p="5"
      display="flex"
      color={days <= 3 ? 'red.500' : 'brand.green2'}
      fontWeight="bold"
      fontSize="1.5rem"
    >
      {days} {handlePlural(days, 'jour')} - {hours}:{minutes}:{seconds}
    </Box>
  );
}

CountDownTimer.propTypes = {
  targetDate: PropTypes.instanceOf(Date).isRequired,
};

export default CountDownTimer;
