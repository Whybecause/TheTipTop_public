import React from 'react';
import PropTypes from 'prop-types';
import { Flex, IconButton } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

import SidebarLogo from '../../shared/nav/SidebarLogo';

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg='white'
      borderBottomWidth="1px"
      borderBottomColor='gray.200'
      justifyContent="flex-start"
      {...rest}
    >

      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <SidebarLogo />

    </Flex>
  );
};

MobileNav.propTypes = {
  onOpen: PropTypes.func.isRequired,
};

export default MobileNav;
