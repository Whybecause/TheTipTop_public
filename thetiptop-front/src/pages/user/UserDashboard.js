import React, { useContext, useEffect, useState } from 'react';
import { Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';

import Layout from '../../components/layout/Layout';
import { giftService } from '../../services/giftService';
import { SessionContext } from '../../context/SessionContext';
import GiftCard from '../../components/dashboard/user/GiftCard';
import Loading from '../../components/layout/Loading';
import useApiError from '../../hooks/useApiError';
import { ApiErrorMessage } from '../../components/error/ApiErrorMessage';

export default function UserDashboard() {
  const user = useContext(SessionContext);

  const [isLoading, setIsLoading] = useState(true);
  const [apiError, updateApiError, resetApiError] = useApiError();
  const [gifts, setGift] = useState([]);

  const fetchGifts = async () => {
    try {
      const result = await giftService.getUserGifts(user.id);
      setGift(result.data.content);
      setIsLoading(false);
      resetApiError();
    } catch (error) {
      setIsLoading(false);
      updateApiError(error);
    }
  };

  useEffect(() => {
    fetchGifts();
  }, []);


  return (
    <Layout
      pageTitle="Mes Gains"
      metaTitle="Mes Gains"
      withDefaultPadding={true}
    >
      <Loading isLoading={isLoading}>

        <ApiErrorMessage apiError={apiError} />

        <SimpleGrid columns={[1, 2, 2]} spacing={10}>
          {gifts?.map((gift) => (
            <GiftCard key={gift.id} gift={gift} type='user' />
          ))}
        </SimpleGrid>

        {!isLoading && !gifts?.length && !apiError?.status?.length && (
          <VStack spacing='5' bg='gray.100' p='5' rounded='lg'>
            <Heading color='brand.green2'>
              Vous n&apos;avez pas encore joué !
            </Heading>
            <Text fontSize='xl'>Participez au concours en obtenant un ticket
              pour tout achat supérieur à 49€
            </Text>
            <Text fontSize='md'>
              Pour tout achat chez ThéTipTop, en magasin ou en ligne
            </Text>
            <Text fontSize='xl'>Tous les tickets sont gagnants !</Text>
          </VStack>
        )}
      </Loading>
    </Layout>
  );
}
