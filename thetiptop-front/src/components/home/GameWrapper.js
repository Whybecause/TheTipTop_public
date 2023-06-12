import React, { useEffect, useState } from 'react';
import { Container, Stack, Text, Image, Box } from '@chakra-ui/react';

import CountDownTimer from './CountDownTimer';
import GameForm from './GameForm';
import { gameService } from '../../services/gameService';
import Loading from '../../components/layout/Loading';
import { adminService } from '../../services/adminService';

function GameWrapper() {
  const [game, setGame] = useState({});
  const [winner, setWinner] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const isGameLaunched = game && Object.keys(game)?.length > 0;
  const isGameStarted = game && new Date(game.startDate) < new Date().getTime();
  const isGameEnded =
    game && new Date(game.endDate).getTime() < new Date().getTime();
  const isGamePlayable = isGameStarted && !isGameEnded;

  const getWinner = async () => {
    if (isGameEnded) {
      const result = await adminService.getWinner();
      setWinner(result.data.content);
    }
  };

  const getGame = async () => {
    try {
      const result = await gameService.getGame();
      if (result.data.content !== null) {
        setGame(result.data.content);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGame();
  }, []);

  useEffect(() => {
    getWinner();
  }, [game]);

  return (
    <>
      <Box bg="brand.main">
        <Image
          objectFit="contain"
          borderRadius="lg"
          src='/img/homepage.jpg'
          alt='ThéTipTop'
          margin="0 auto"
          height='auto'
        />
      </Box>

      <Container
        marginTop="20px"
        as="section"
        maxW="4xl"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        borderRadius="2xl"
        border='2px solid'
        borderColor="gray.100"
        p='5'
      >
        <Loading isLoading={isLoading}>
          {!isGameLaunched && (
            <Text fontSize="xl">Le concours commencera bientôt !</Text>
          )}

          {isGameLaunched && !isGameStarted && (
            <>
              <Text fontSize="xl">Le jeu commencera dans :</Text>
              <CountDownTimer targetDate={new Date(game.startDate)} />
            </>
          )}

          {isGameLaunched && isGamePlayable && (
            <>
              <Text fontSize="xl">Le jeu terminera dans :</Text>
              <CountDownTimer targetDate={new Date(game.endDate)} />
              <GameForm />
            </>
          )}

          {isGameEnded && (
            <>
              <Text fontSize="xl">
                Le jeu est terminé, merci à tous les participants ! &nbsp;
                <span role="img" aria-label="party">
                  🥳
                </span>
              </Text>

              {!Object.keys(winner).length && (
                <Text pt="2em">Nous allons bientôt élire le grand gagnant</Text>
              )}

              {Object.keys(winner).length > 0 && (
                <Stack pt="2em" alignItems="center">
                  <Text>
                    Le grand gagnant d&apos;un an de thé d&apos;une valeur de
                    360€ est :
                  </Text>
                  <Text>{winner.username}</Text>
                </Stack>
              )}
            </>
          )}
        </Loading>
      </Container>
    </>
  );
}

export default GameWrapper;
