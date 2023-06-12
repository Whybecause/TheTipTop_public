import { VStack } from '@chakra-ui/react';
import React from 'react';
import Layout from '../../components/layout/Layout';

const CookiesPolicy = () => {
  return (
    <Layout
      pageTitle="Politique de cookies"
      metaTitle="Politique de cookies"
    >

      <h3>Qu’est-ce qu’un « cookie » ?</h3>

      <VStack p='2' spacing='4' align="stretch">
        <p>
          Un « Cookie » ou traceur est un fichier électronique déposé
          sur un terminal (ordinateur, tablette, smartphone, …) et lu par
          exemple lors de la consultation d&apos;un site internet, de la lecture
          d&apos;un courrier électronique, de l&apos;installation ou de
          l&apos;utilisation d&apos;un logiciel ou d&apos;une application mobile
          et ce, quel que soit le type de terminal utilisé
          (source: <a href="https://www.cnil.fr/fr/cookies-traceurs-que-dit-la-loi">Le site de la CNIL</a>).
        </p>

        <p>
          Le site peut collecter automatiquement des informations standards.
          Toutes les informations collectées indirectement ne seront utilisées
          que pour suivre le volume, le type et la configuration du trafic
          utilisant ce site, pour en développer la conception et
          l&apos;agencement et à d&apos;autres fins administratives et de
          planification et plus généralement pour améliorer le service
          que nous vous offrons.
        </p>

        <p>
          Le cas échéant, des « cookies » émanant de l&apos;éditeur du site
          et/ou des sociétés tiers pourront être déposés sur votre terminal,
          avec votre accord. Dans ce cas, lors de la première navigation sur ce
          site, une bannière explicative sur l&apos;utilisation des « cookies »
          apparaîtra. Avant de poursuivre la navigation, le client et/ou le
          prospect devra accepter ou refuser l’utilisation desdits « cookies ».
          Le consentement donné sera valable pour une période de treize
          (13) mois. L&apos;utilisateur a la possibilité de désactiver les
          cookies à tout moment.
        </p>
      </VStack>


      <h3>Les cookies suivants sont présents sur ce site </h3>

      <VStack p='2' spacing='4' align="stretch">
        <p>Cookies Google :</p>
        <ul>
          <li>Google analytics : permet de mesurer l&apos;audience du site.</li>
          <li>
            Google tag manager : facilite l’implémentation des tags sur
            les pages et permet de gérer les balises Google.
          </li>
        </ul>
      </VStack>

    </Layout>
  );
};

export { CookiesPolicy };
