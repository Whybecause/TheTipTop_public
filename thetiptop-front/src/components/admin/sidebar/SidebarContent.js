import React from 'react';
import PropTypes from 'prop-types';
import { Box, CloseButton, Flex } from '@chakra-ui/react';

import SidebarLogo from '../../shared/nav/SidebarLogo';
import NavItem from '../../shared/nav/NavItem';
import { getAuthenticatedLinks } from '../../../helpers/getNavLinks';

const authenticatedLinks = getAuthenticatedLinks();

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg='white'
      borderRight="1px"
      borderRightColor='gray.200'
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>

      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <SidebarLogo />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      {authenticatedLinks.map(({ name, URL, icon }) => (
        <NavItem key={name} icon={icon} href={URL}>
          {name}
        </NavItem>
      ))}

    </Box>
  );
};

SidebarContent.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SidebarContent;
