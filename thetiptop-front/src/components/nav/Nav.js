import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Collapse,
  Divider,
  Flex,
  HStack,
  IconButton,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';

import { getNavLinks } from '../../helpers/getNavLinks';
import SidebarLogo from '../shared/nav/SidebarLogo';
import NavLink from './NavLink';

const Nav = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navLinks = getNavLinks();
  return (
    <Box bg='white' px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>

        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />

        <HStack spacing={8} alignItems={'center'}>
          <SidebarLogo/>
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}>
            {navLinks.map(({ name, URL }) => (
              <Box key={name}>
                <NavLink
                  url={URL}
                >
                  {name}
                </NavLink>
              </Box>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          {children}
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Box rounded="md" bg='white' pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {navLinks.map(({ name, URL }) => (
              <Box key={name}>
                <Divider />
                <NavLink url={URL}>{name}</NavLink>
              </Box>
            ))}
          </Stack>
        </Box>
      </Collapse>

    </Box>
  );
};

Nav.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Nav;
