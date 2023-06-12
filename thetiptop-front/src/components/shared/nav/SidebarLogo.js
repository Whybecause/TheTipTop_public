import React from 'react';
import { Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SidebarLogo = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  return (
    <Image
      src='/img/NavbarLogo.png'
      onClick={handleClick}
      boxSize='250'
      alt='ThéTipTop'
      cursor="pointer"
    />
  );
};

export default SidebarLogo;
