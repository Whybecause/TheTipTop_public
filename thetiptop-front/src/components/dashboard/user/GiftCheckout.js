import React from 'react';
import PropTypes from 'prop-types';
import { Button, Stack, Text } from '@chakra-ui/react';

import { MyModal } from '../../../styled-components';
import { prettifyGiftType } from '../../../helpers/prettifyGiftType';

const GiftCheckout = ({ gift }) => {
  return (
    <MyModal
      size="lg"
      closeButton={true}
      toggle= {
        <Button>Obtenir</Button>
      }
      header={`Obtenir mon ${prettifyGiftType(gift.typeDisplay)}`}
      body={
        <Stack spacing='1em' p='1em'>
          <Text textAlign="center">
            Retirez votre gain dans un magasin ThéTipTop à l&apos;aide du code :
          </Text>
          <Text
            fontWeight={'bold'}
            textAlign="center"
          >
            {gift.code}
          </Text>
        </Stack>
      }
    />
  );
};


GiftCheckout.propTypes = {
  gift: PropTypes.object.isRequired,
};

export default GiftCheckout;
