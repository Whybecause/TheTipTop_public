import React from 'react';
import { Image, Text } from '@chakra-ui/react';

import Layout from '../components/layout/Layout';

export default function About() {
  return (
    <>
      <Layout pageTitle="..." metaTitle="A propos">
        <Image
          mt="50px"
          src="/img/logo.png"
          width="70%"
          alt="ThéTipTop"
          ml="auto"
          mr="auto"
        />
        <Text mt="50px">
          Conçue en 2012, ThéTipTop est une société spécialisée dans la
          promotion de hautes gammes de thés, bios et faits à la main. Nous
          possèdons une large gamme de produits, comprenant entre autres des
          thés détox, thés blancs, thés légumes, infusions….
        </Text>
      </Layout>
    </>
  );
}
