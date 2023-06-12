import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Icon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NavItem = ({ icon, href, children, ...rest }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(href);
  };

  return (
    <Box
      onClick={handleClick}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
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
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

NavItem.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default NavItem;
