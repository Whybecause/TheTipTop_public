import { Box, VStack } from '@chakra-ui/react';
import React from 'react';
import Layout from '../../components/layout/Layout';

const LegalNotice = () => {
  return (
    <Layout
      pageTitle="Mentions légales"
      metaTitle="Mentions légales"
    >
      <h3>1.1 Site (ci-après « le site »)</h3>
      <Box as="p" p='2'>ThéTipTop</Box>

      <h3>1.2 Éditeur (ci-après « l&apos;éditeur »)</h3>
      <VStack p='2' spacing='4' align="stretch">
        <p><strong>Raison Sociale</strong>: Furious Ducks</p>
        <p><strong>N° SIRET</strong>: 797 546 661 00012</p>
        <p><strong>Code APE</strong> : 8560E</p>
        <p><strong>RCS </strong>: 797546661</p>
        <p><strong>Capital </strong>: 100 000,000€</p>
        <p><strong>Siège social </strong>: 15 rue de Rivoli, 75001, Paris</p>
        <p><strong>Responsable de publication</strong>: Mr Guido Brasletti</p>
        <ul><strong>Nous contacter</strong>:</ul>
        <li>
          <strong>Par voie postale</strong>:
          15 rue de Rivoli, 75001, Paris
        </li>
        <li>
          <strong>Par voie électronique</strong>:
          thetiptopg1analytics@gmail.com
        </li>
        <li><strong>Par téléphone </strong>: 01000000</li>
      </VStack>

      <h3>1.3 Hébergeur (ci-après « l&apos;hébergeur »)</h3>
      <VStack p='2' spacing='4' align="stretch">
        <p>
          Le site du jeu-concours de ThéTipTop est hébergé par google cloud
          platform, dont le siège social est situé
          8 rue de Londres 75009 Paris.
        </p>
      </VStack>

      <h3>1.4 Délégué à la protection des données (DPO)</h3>
      <VStack p='2' spacing='4' align="stretch">
        <p>
          Un délégué à la protection des données : hugo james,
          hugojames@gmail.com, est à votre disposition pour
          toute question relative à la protection de vos données personnelles.
        </p>
      </VStack>

    </Layout>
  );
};

export { LegalNotice };
