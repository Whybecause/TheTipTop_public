import React from 'react';
import { Center, Container } from '@chakra-ui/react';
import './styles.css';

function StepsCircles() {
  return (
    <Container as="section" maxW="4xl" py="10" px='1em'>

      <Center as="h2" pb="5">
        COMMENT PARTICIPER
      </Center>

      <div className="steps__homepage">
        <div className="step__container">
          <div className="circle">1</div>
          <span>S&apos;INSCRIRE GRATUITEMENT</span>
        </div>
        <div className="step__container">
          <div className="circle">2</div>
          <span>TESTER LE NUMERO DE TICKET</span>
        </div>
        <div className="step__container">
          <div className="circle">3</div>
          <span>RECUPERER LE PRIX</span>
        </div>
      </div>
    </Container>
  );
}

export default StepsCircles;
