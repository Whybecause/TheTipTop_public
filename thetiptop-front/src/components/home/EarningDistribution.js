import React from 'react';

import {
  Center,
  List,
  ListItem,
  ListIcon,
  Button,
  Box,
} from '@chakra-ui/react';
import { BsFillGiftFill } from 'react-icons/bs';
import { MyModal } from '../../styled-components';

function EarningDistribution() {
  return (
    <MyModal
      closeButton={true}
      toggle={
        <Button variant="secondary">
          Répartition des gains
        </Button>
      }
      header="Répartition des gains"
      size="2xl"
      body={
        <>
          <Box as="p" fontSize="1.2rem">
            Chaque participation vous octroie une chance de remporter un lot.
          </Box>
          <Center as="p" textDecoration="underline" fontSize="1.2rem" py="3">
            Parmis les tickets:
          </Center>
          <Center mb="3">
            <List spacing="3">
              <ListItem mt="3">
                <ListIcon as={BsFillGiftFill} color="brand.red" />
                60% offrent un infuseur à thé
              </ListItem>
              <ListItem>
                <ListIcon as={BsFillGiftFill} color="brand.red" />
                20% offrent une boite de 100g d’un thé détox ou d’infusion
              </ListItem>
              <ListItem>
                <ListIcon as={BsFillGiftFill} color="brand.red" />
                10% offrent une boite de 100g d’un thé signature
              </ListItem>
              <ListItem>
                <ListIcon as={BsFillGiftFill} color="brand.red" />
                6% offrent un coffret découverte d’une valeur de 39€
              </ListItem>
              <ListItem>
                <ListIcon as={BsFillGiftFill} color="brand.red" />
                4% offrent un coffret découverte d’une valeur de 69€
              </ListItem>
            </List>
          </Center>
        </>
      }
    />
  );
}

export default EarningDistribution;
