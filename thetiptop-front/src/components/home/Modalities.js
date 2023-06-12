import React from 'react';

import {
  Container,
  Center,
  List,
  ListItem,
  ListIcon,
  HStack,
  Box,
  Flex,
  Text,
  Divider,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

import EarningDistribution from './EarningDistribution';

function Modalities() {
  return (
    <Container as="section" maxW="4xl" py="10" px='1em'>
      <Center as="h2" pb="5">MODALITES DU JEU CONCOURS</Center>
      <List spacing="3">
        <ListItem>
          <HStack>
            <ListIcon as={CheckIcon} color="green.500" />
            <span>
              Votre code se trouve sur chaque ticket ou facture
              d&apos;un montant supérieur à 49€
              effectué dans une boutique Thétiptop ou sur
              <Box as="a" color="brand.green4"
                fontWeight="bold"
                href="#"> thétiptop.com</Box>
            </span>
          </HStack>
        </ListItem>

        <ListItem>
          <HStack>

            <ListIcon as={CheckIcon} color="green.500" />

            <Flex
              flexDir={{ base: 'column', sm: 'row' }}
              alignItems="center"
            >
              <Text
                mr='5'
                fontWeight={'bold'}
              >
                100% des tickets sont gagnants
              </Text>
              <EarningDistribution />
            </Flex>

          </HStack>
        </ListItem>

        <ListItem>
          <HStack>
            <ListIcon as={CheckIcon} color="green.500" />
            <span>
              En plus du lot gagné, un tirage au sort aura lieu à la clôture
              du concours pour élire
              le <b>gagnant d&apos;un an de thé</b> d&apos;une valeur de 360€
            </span>
          </HStack>
        </ListItem>
      </List>
      <Divider mt='5'/>
    </Container>
  );
}

export default Modalities;
