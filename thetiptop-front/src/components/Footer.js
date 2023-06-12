import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  chakra,
  useColorModeValue,
  VisuallyHidden,
  Image,
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

const Logo = () => {
  return (
    <Image
      src='/img/logo.png'
      alt='ThéTipTop'
      cursor="pointer"
      w='100%'
      h='auto'
    />
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

ListHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

const SocialButton = ({
  children,
  label,
  href,
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

SocialButton.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default function Footer() {
  return (
    <Box
      bg="brand.main"
      borderTop="2px solid black"
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr' }}
          spacing={8}>
          <Stack spacing={6}>
            <Box>
              <Logo/>
            </Box>
            <Text fontSize={'sm'}>
              © 2022 ThéTipTop. Tous droits réservés.
            </Text>
            <Text>
              Version 0.0.1
            </Text>
            <Text fontWeight="bold">
              Ce site est un projet étudiant fictif.
            </Text>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Société</ListHeader>
            <Link href={'/about'}>A propos de nous</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Link href={'/contact'}>Contact</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Legal</ListHeader>
            <Link href={'/legal/cookies'}>Politique de cookies</Link>
            <Link
              href={'/legal/confidentiality'}
            >
              Politique de confidentialité
            </Link>
            <Link
              href={'/legal/terms-of-use'}
            >
              Conditions d&apos;utilisation
            </Link>
            <Link href={'/legal/legal-notice'}>Mentions légales</Link>
          </Stack>
          <Stack align="flex-start" spacing="5">
            <ListHeader>Suivez-nous</ListHeader>
            <SocialButton label={'Twitter'} href={'#'}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'#'}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
