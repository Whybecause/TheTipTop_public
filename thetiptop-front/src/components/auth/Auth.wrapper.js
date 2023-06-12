import React from 'react';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Icon,
  Box,
} from '@chakra-ui/react';
import { BiUserCircle } from 'react-icons/bi';

import { MyModal } from '../../styled-components';
import Login from './Login';
import Register from './Register';
import ResetPasswordLink from './ResetPasswordLink';

export default function Auth() {
  return (
    <MyModal
      toggle={
        <Box
          rounded={'full'}
          cursor={'pointer'}
          w='8'
          h='8'
          _hover={{ bg: 'brand.green1' }}
          data-cy='auth-modal'
        >
          <Icon as={BiUserCircle} w={8} h={8} />
        </Box>
      }
      header="Bienvenue chez ThéThipTop"
      body={
        <Tabs colorScheme="blue">
          <TabList>
            <Tab>Connexion</Tab>
            <Tab data-cy='register-tab'>Inscription</Tab>
            <Tab>Mot de passe?</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>

              <Login />

            </TabPanel>
            <TabPanel>

              <Register />

            </TabPanel>
            <TabPanel>

              <ResetPasswordLink />

            </TabPanel>
          </TabPanels>
        </Tabs>}
    />
  );
}
