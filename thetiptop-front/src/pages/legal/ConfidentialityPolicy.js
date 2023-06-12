import { VStack } from '@chakra-ui/react';
import React from 'react';
import Layout from '../../components/layout/Layout';

const ConfidentialityPolicy = () => {
  return (
    <Layout
      pageTitle="Politique de confidentialité"
      metaTitle="Politique de confidentialité"
    >
      <h3>Article 1 - Collecte et protection des données</h3>
      <VStack p='2' spacing='4' align="stretch">
        <p>Vos données sont collectées par la société Furious Duck.</p>
        <p>
          Une donnée à caractère personnel désigne toute information
          concernant une personne physique identifiée ou identifiable
          (personne concernée) ; est réputée identifiable une personne
          qui peut être identifiée, directement ou indirectement, notamment
          par référence à un nom, un numéro d&apos;identification ou à un ou
          plusieurs éléments spécifiques, propres à son identité physique,
          physiologique, génétique, psychique, économique,
          culturelle ou sociale.
        </p>

        <p>
          Les informations personnelles pouvant être recueillies sur le site
          sont principalement utilisées par l&apos;éditeur pour la gestion des
          relations avec vous, et le cas échéant pour le traitement de
          vos commandes.
        </p>

        <p>Les données personnelles collectées sont les suivantes :</p>
        <ul>
          <li>Nom et prénom</li>
          <li>Adresse mail</li>
        </ul>
        <p>
          Un délégué à la protection des données : hugo james,
          hugojames@gmail.com, est à votre disposition pour toute question
          relative à la protection de vos données personnelles.
        </p>
      </VStack>


      <h3>
        Article 2 - Droit d’accès, de rectification et
        de référencement de vos données
      </h3>
      <VStack p='2' spacing='4' align="stretch">
        <p>
          En application de la réglementation applicable aux données à caractère
          personnel, les utilisateurs disposent des droits suivants :
        </p>
        <ul>
          <li>
            <strong>Le droit d’accès </strong>:
            ils peuvent exercer leur droit d&apos;accès,
            pour connaître les données personnelles les concernant, en écrivant
            à l&apos;adresse électronique ci-dessous mentionnée.
            Dans ce cas, avant la mise en œuvre de ce droit, la Plateforme peut
            demander une preuve de l&apos;identité de l&apos;utilisateur afin
            d&apos;en vérifier l&apos;exactitude.
          </li>

          <li>
            <strong>Le droit de rectification </strong>:
            si les données à caractère personnel
            détenues par la Plateforme sont inexactes, ils peuvent demander la
            mise à jour des informations.
          </li>

          <li>
            <strong>Le droit de suppression des données </strong>:
            les utilisateurs peuvent
            demander la suppression de leurs données à caractère personnel,
            conformément aux lois applicables en matière de protection des
            données.
          </li>

          <li>
            <strong>Le droit à la limitation du traitement </strong>:
            les utilisateurs peuvent
            demander à la Plateforme de limiter le traitement des données
            personnelles conformément aux hypothèses prévues par le RGPD.
          </li>

          <li>
            <strong>
              Le droit de s&apos;opposer au traitement des données
            </strong>:
            les utilisateurs
            peuvent s&apos;opposer à ce que leurs données soient traitées
            conformément aux hypothèses prévues par le RGPD.
          </li>

          <li>
            <strong>Le droit à la portabilité </strong>:
            ils peuvent réclamer que la Plateforme
            leur remette les données personnelles qu&apos;ils ont fournies pour
            les transmettre à une nouvelle Plateforme.
          </li>
          <p>
            Vous pouvez exercer ce droit en nous contactant, à l’adresse
            suivante : 15 RUE DE RIVOLI 75001, PARIS . Ou par email, à
            l’adresse : dsp.final.2022@gmail.com. Vous pouvez aussi vous
            adresser à notre délégué à la protection des données : hugo james,
            hugojames@gmail.com, qui est à votre disposition pour toute question
            relative à la protection de vos données personnelles.
            Toute demande doit être accompagnée de la photocopie d’un titre
            d’identité en cours de validité signé et faire mention de l’adresse
            à laquelle l&apos;éditeur pourra contacter le demandeur. La réponse
            sera adressée dans le mois suivant la réception de la demande.
            Ce délai d&apos;un mois peut être prolongé de deux mois si la
            complexité de la demande et/ou le nombre de demandes
            l&apos;exigent. De plus, et depuis la loi n°2016-1321 du 7 octobre
            2016, les personnes qui le souhaitent, ont la possibilité
            d’ organiser le sort de leurs données après leur décès.
            Pour plus d’information sur le sujet, vous pouvez consulter le
            site Internet de la CNIL : <a href="https://www.cnil.fr/">CNIL</a>.
            Les utilisateurs peuvent aussi introduire une réclamation auprès
            de la CNIL sur le site de la CNIL.
          </p>

          <p>
              Nous vous recommandons de nous contacter dans un premier
              temps avant de déposer une réclamation auprès de la CNIL,
              car nous sommes à votre entière disposition pour régler
              votre problème.
          </p>
        </ul>
      </VStack>

      <h3>Article 3 - Utilisation des données</h3>
      <VStack p='2' spacing='4' align="stretch">
        <p>
          Les données personnelles collectées auprès des utilisateurs ont
          pour objectif la mise à disposition des services de la Plateforme,
          leur amélioration et le maintien d&apos;un environnement sécurisé.
          La base légale des traitements est l&apos;exécution du contrat entre
          l&apos;utilisateur et la Plateforme.
          Plus précisément, les utilisations sont les suivantes :
        </p>
        <ul>
          <li>Accès et utilisation de la Plateforme par l&apos;utilisateur.</li>
          <li>Gestion du fonctionnement et optimisation de la Plateforme.</li>
          <li>Mise en œuvre d&apos;une assistance utilisateurs.</li>
          <li>
            Vérification, identification et authentification des données
            transmises par l&apos;utilisateur.
          </li>
          <li>
            Personnalisation des services en affichant des publicités en
            fonction de l&apos;historique de navigation de l&apos;utilisateur,
            selon ses préférences.
          </li>
          <li>
            Prévention et détection des fraudes, malwares
            (malicious softwares ou logiciels malveillants)
            et gestion des incidents de sécurité.
          </li>
          <li>Gestion des éventuels litiges avec les utilisateurs.</li>
          <li>
            Envoi d&apos;informations commerciales et publicitaires, en fonction
            des préférences de l&apos;utilisateur.
          </li>
        </ul>
      </VStack>


      <h3>Article 4 - Politique de conservation des données</h3>
      <VStack p='2' spacing='4' align="stretch">
        <p>
          La Plateforme conserve vos données pour la durée
          nécessaire pour vous fournir ses services ou son assistance.
        </p>
        <p>
          Dans la mesure raisonnablement nécessaire ou requise pour
          satisfaire aux obligations légales ou réglementaires, régler
          des litiges, empêcher les fraudes et abus ou appliquer nos
          modalités et conditions, nous pouvons également conserver
          certaines de vos informations si nécessaire, même après que
          vous ayez fermé votre compte ou que nous n&apos;ayons plus
          besoin pour vous fournir nos services.
        </p>
      </VStack>


      <h3>Article 5 - Partage des données personnelles avec des tiers</h3>
      <VStack p='2' spacing='4' align="stretch">
        <p>
          Les données personnelles peuvent être partagées avec des sociétés
          tierces exclusivement dans l’Union européenne, dans les cas suivants :
        </p>
        <ul>
          <li>
              Lorsque l&apos;utilisateur publie, dans les zones de
              commentaires libres de la Plateforme, des informations
              accessibles au public.
          </li>
          <li>
              Quand l&apos;utilisateur autorise le site web d&apos;un
              tiers à accéder à ses données.
          </li>
          <li>
            Quand la Plateforme recourt aux services de prestataires pour
            fournir l&apos;assistance utilisateurs, la publicité et les
            services de paiement. Ces prestataires disposent d&apos;un accès
            limité aux données de l&apos;utilisateur, dans le cadre de
            l&apos;exécution de ces prestations, et ont l&apos;obligation
            contractuelle de les utiliser en conformité avec les dispositions
            de la réglementation applicable en matière  de protection des
            données à caractère personnel.
          </li>
          <li>
            Si la loi l&apos;exige, la Plateforme peut effectuer la
            transmission de données pour donner suite aux réclamations
            présentées contre la Plateforme et se conformer aux procédures
            administratives et judiciaires.
          </li>
        </ul>
      </VStack>

      <h3>Article 6 - Offres commerciales</h3>
      <VStack p='2' spacing='4' align="stretch">
        <p>
          Vos données sont susceptibles d’être utilisées par les partenaires
          de l&apos;éditeur à des fins de prospection commerciale, si vous
          ne le souhaitez pas, veuillez cliquer sur le lien suivant :
          <a href="/contact">Contactez-nous</a>
        </p>
        <p>
          Si, lors de la consultation du site, vous accédez à des
          données à caractère personnel, vous devez vous abstenir de
          toute collecte, de toute utilisation non autorisée et de tout
          acte pouvant constituer une atteinte à la vie privée ou à la
          réputation des personnes. L&apos;éditeur décline toute
          responsabilité à cet égard.
        </p>
        <p>
          Les données sont conservées et utilisées pour une durée
          conforme à la législation en vigueur.
        </p>
      </VStack>

      <h3>Article  7 - Photographies et représentation des produits</h3>
      <VStack p='2' spacing='4' align="stretch">
        <p>
          Les photographies de produits, accompagnant leur description,
          ne sont pas contractuelles et n&apos;engagent pas l&apos;éditeur.
        </p>
      </VStack>


      <h3>Article 8 - Loi applicable</h3>
      <VStack p='2' spacing='4' align="stretch">
        <p>
          Les présentes conditions d&apos;utilisation du site sont
          régies par la loi française et soumises à la compétence des
          tribunaux du siège social de l&apos;éditeur, sous réserve
          d&apos;une attribution de compétence spécifique découlant
          d&apos;un texte de loi ou réglementaire particulier.
        </p>
      </VStack>

      <h3>Article 9 - Contactez-nous</h3>
      <VStack p='2' spacing='4' align="stretch">
        <p>
          Pour toute question, information sur les produits présentés
          sur le site, ou concernant le site lui-même, vous pouvez
          laisser un message à l&apos;adresse suivante :
          thetiptopg1analytics@gmail.com
        </p>
      </VStack>

    </Layout>
  );
};

export { ConfidentialityPolicy };
