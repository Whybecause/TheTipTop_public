import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Drawer,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';

import SidebarContent from './SidebarContent';
import MobileNav from './MobileNav';

export default function AdminSidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />

      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />

      <Box ml={{ base: 0, md: 60 }}>
        {children}
      </Box>

    </Box>
  );
}

AdminSidebar.propTypes = {
  children: PropTypes.node.isRequired,
};
