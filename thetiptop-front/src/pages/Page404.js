import { Button, Container, Heading, Stack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';

function Page404() {
  const navigate = useNavigate();

  return (
    <Layout
      pageTitle="Page non trouvée"
      metaTitle="404 - Page non trouvée"
    >
      <Container
        minH='50vh'
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          boxShadow={'2xl'}
          bg='gray.50'
          rounded={'xl'}
          p={10}
          spacing={8}
          align={'center'}>
          <Stack align={'center'} spacing={2}>
            <Heading
              fontSize={'3xl'}
              color='gray.800'>
              404 - Oops...Vous vous êtes égaré !
            </Heading>
          </Stack>
          <Stack
            spacing={4}
            direction={{ base: 'column', md: 'row' }}
            w={'full'}
          >
            <Button
              onClick={() => navigate('/')}
              rounded={'full'}
              flex={'1 0 auto'}
            >
              Retour à l&apos;accueil
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Layout>
  );
}

export default Page404;
