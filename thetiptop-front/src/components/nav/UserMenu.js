import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
} from '@chakra-ui/react';

import { authService } from '../../services/authService';
import { getAuthenticatedLinks } from '../../helpers/getNavLinks';
import { CloseIcon } from '@chakra-ui/icons';
import NavItem from '../shared/nav/NavItem';

const UserMenu = ({ initials }) => {
  const logOut = () => {
    authService.logout();
  };

  const authenticatedLinks = getAuthenticatedLinks();

  return (
    <Menu>
      <MenuButton
        rounded={'full'}
        w='8'
        h='8'
        d="flex"
        background='brand.green2'
        _hover={{ bg: 'brand.green6', color: 'white' }}
        _active={{ boxShadow: '0 0 3px 5px green' }}
        data-cy='auth-nav-button'
      >
        <Box data-cy='user-initials'>{initials}</Box>
      </MenuButton>
      <MenuList>
        {authenticatedLinks.map(({ name, URL, icon }) => (
          <NavItem key={name} icon={icon} href={URL}>
            {name}
          </NavItem>
        ))}
        <MenuDivider />
        <Box
          style={{ textDecoration: 'none' }}
          _focus={{ boxShadow: 'none' }}
          data-cy='logout-button'
          onClick={logOut}
        >
          <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
              bg: 'brand.green2',
              color: 'white',
            }}
          >
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={CloseIcon}
            />
            Déconnexion
          </Flex>
        </Box>
      </MenuList>
    </Menu>
  );
};

UserMenu.propTypes = {
  initials: PropTypes.string.isRequired,
};

export default UserMenu;
