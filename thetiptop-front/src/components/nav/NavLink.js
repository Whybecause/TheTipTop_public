import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NavLink = ({ url, children }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(url);
  };
  return (
    <Box
      px={2}
      cursor="pointer"
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: 'gray.200',
      }}
      onClick={handleClick}>
      {children}
    </Box>
  );
};

NavLink.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavLink;
