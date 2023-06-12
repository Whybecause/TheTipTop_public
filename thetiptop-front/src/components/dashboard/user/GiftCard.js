import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  Button,
} from '@chakra-ui/react';

import { prettifyGiftType } from '../../../helpers/prettifyGiftType';
import GiftCheckout from './GiftCheckout';
import { useNavigate } from 'react-router-dom';


export default function GiftCard({ gift, type, handleAdminCheckout }) {
  const navigate = useNavigate();

  let content;

  if (gift.checkedOut) {
    content = (
      <Box bg="tomato" p='2' color="white" rounded='md'>
        <Text>Cadeau obtenu</Text>
      </Box>
    );
  }

  // For home, game result display, redirecting to dashboard
  if (!gift.checkedOut && type === 'game') {
    content = (
      <Button
        onClick={() => navigate('/dashboard')}
        variant="secondary"
      >Récupérer mon prix</Button>
    );
  }

  // For /admin/user/:id opening on a direct checkout
  if (!gift.checkedOut && type === 'admin') {
    content = (
      <Button
        onClick={() => handleAdminCheckout(gift)}
      >
    Checkout
      </Button>
    );
  }

  // For /dashboard user checkout opening on a form
  if (!gift.checkedOut && type === 'user') {
    content = (<GiftCheckout gift={gift} />);
  }


  return (
    <Center py={12} px={2}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg='white'
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            background: 'pink',
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={`/img/${gift?.typeDisplay}.jpg`}
            alt={gift?.typeDisplay}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                ThéTipTop
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {prettifyGiftType(gift?.typeDisplay)}
          </Heading>

          <Stack direction={'row'} align={'center'}>
            {content}
          </Stack>

        </Stack>
      </Box>
    </Center>
  );
}

GiftCard.propTypes = {
  gift: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  handleAdminCheckout: PropTypes.func,
};

