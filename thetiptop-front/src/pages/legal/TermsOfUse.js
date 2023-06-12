import { VStack } from '@chakra-ui/react';
import React from 'react';
import Layout from '../../components/layout/Layout';

const TermsOfUse = () => {
  return (
    <Layout
      pageTitle="Conditions d'utilisation"
      metaTitle="Conditions d'utilisation"
    >
      <h3>Article 1 - Accès au site</h3>
      <VStack p='2' spacing='4' align="stretch">
        <p>
          L&apos;accès au site et son utilisation sont réservés à un usage
          strictement personnel. Vous vous engagez à ne pas utiliser ce
          site et les informations ou données qui y figurent à des fins
          commerciales, politiques, publicitaires et pour toute forme de
          sollicitation commerciale et notamment l&apos;envoi de courriers
          électroniques non sollicités.
        </p>
      </VStack>

      <h3>Article 2 - Contenu du site</h3>
      <VStack p='2' spacing='4' align="stretch">
        <p>
          Toutes les marques, photographies, textes, commentaires,
          illustrations, images animées ou non, séquences vidéo,
          sons, ainsi que toutes les applications informatiques qui
          pourraient être utilisées pour faire fonctionner ce site et
          plus généralement tous les éléments reproduits ou utilisés sur
          le site sont protégés par les lois en vigueur au titre de la
          propriété intellectuelle. Ils sont la propriété pleine et entière
          de l&apos;éditeur ou de ses partenaires. Toute reproduction,
          représentation, utilisation ou adaptation, sous quelque forme que
          ce soit, de tout ou partie de ces éléments, y compris les
          applications informatiques, sans l&apos;accord préalable et écrit de
          l&apos;éditeur, sont strictement interdites. Le fait pour
          l&apos;éditeur de ne pas engager de procédure dès la prise de
          connaissance de ces utilisations non autorisées ne vaut pas
          acceptation desdites utilisations et renonciation aux poursuites.
        </p>
      </VStack>

      <h3>Article 3 - Gestion du site</h3>

      <VStack p='2' spacing='4' align="stretch">
        <p>
          Pour la bonne gestion du site, l&apos;éditeur pourra à tout moment :
        </p>
        <ul>
          <li>
            Suspendre, interrompre ou limiter l&apos;accès à tout ou partie
            du site, réserver l&apos;accès au site, ou à certaines parties du
            site, à une catégorie déterminée d&apos;internautes.
          </li>
          <li>
            Supprimer toute information pouvant en perturber le fonctionnement
            ou entrant en contravention avec les lois nationales ou
            internationales.
          </li>
          <li>Suspendre le site afin de procéder à des mises à jour.</li>
        </ul>
      </VStack>

      <h3>Article 4 - Responsabilités</h3>

      <VStack p='2' spacing='4' align="stretch">
        <p>
          La responsabilité de l&apos;éditeur ne peut être engagée en cas de
          défaillance, panne, difficulté ou interruption de fonctionnement,
          empêchant l&apos;accès au site ou à une de ses fonctionnalités.
          Le matériel de connexion au site que vous utilisez est sous votre
          entière responsabilité. Vous devez prendre toutes les mesures
          appropriées pour protéger votre matériel et vos propres données
          notamment d&apos;attaques virales par Internet. Vous êtes par ailleurs
          seul responsable des sites et données que vous consultez.
        </p>

        <p>
          L&apos;éditeur ne pourra être tenu responsable en cas de poursuites
          judiciaires à votre encontre :</p>
        <ul>
          <li>
            Du fait de l&apos;usage du site ou de tout service accessible
            via Internet.
          </li>
          <li>
            Du fait du non-respect par vous des présentes conditions générales.
          </li>
        </ul>

        <p>
          L&apos;éditeur n&apos;est pas responsable des dommages causés à
          vous-même, à des tiers et/ou à votre équipement du fait de votre
          connexion ou de votre utilisation du site et vous renoncez à toute
          action contre lui de ce fait. Si l&apos;éditeur venait à faire
          l&apos;objet d&apos;une procédure amiable ou judiciaire en raison
          de votre utilisation du site, il pourra se retourner contre vous
          pour obtenir l&apos;indemnisation de tous les préjudices, sommes,
          condamnations et frais qui pourraient découler de cette procédure.
        </p>
      </VStack>

      <h3>Article 5 - Liens hypertextes</h3>
      <VStack p='2' spacing='4' align="stretch">
        <p>
          La mise en place par les utilisateurs de tous liens hypertextes
          vers tout ou partie du site est autorisée par l&apos;éditeur.
          Tout lien devra être retiré sur simple demande de l&apos;éditeur.
          Toute information accessible via un lien vers d&apos;autres sites
          n&apos;est pas publiée par l&apos;éditeur. L&apos;éditeur ne
          dispose d&apos;aucun droit sur le contenu présent dans ledit lien.
        </p>
      </VStack>


    </Layout>
  );
};

export { TermsOfUse };
