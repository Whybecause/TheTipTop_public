import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Stack, Text } from '@chakra-ui/react';

import { adminService } from '../../../services/adminService';
import CountDownTimer from '../../home/CountDownTimer';

function FinalWinner({ game }) {
  const [winner, setWinner] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const isGameLaunched = Object.keys(game)?.length > 0;
  const isGameStarted = new Date(game.startDate) < new Date().getTime();
  const isGameEnded = new Date(game.endDate).getTime() < new Date().getTime();
  const isGamePlayable = isGameStarted && !isGameEnded;
  const hasWinner = Object.keys(winner).length > 0;

  const defineWinner = async () => {
    try {
      setIsLoading(true);
      const result = await adminService.defineWinner();
      setWinner(result.data.content);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getWinner = async () => {
    if (isGameEnded) {
      const result = await adminService.getWinner();
      if (Object.keys(result.data.content).length) {
        setWinner(result.data.content);
      }
    }
  };

  const resetWinner = async () => {
    await adminService.resetWinner();
    setWinner({});
  };

  useEffect(() => {
    getWinner();
  }, [game]);

  return (
    <Box
      p='5'
      rounded='lg'
      border="1px solid gray"
      display="flex"
      justifyContent="center"
      textAlign="center"
      maxW='4xl'
      margin='0 auto'
    >
      <Stack
        spacingy='2em'
        direction="column"
        alignItems="center"
        justifyContent="center"
      >

        {!isGameLaunched && (
          <p>Le jeu n&apos;est pas encore lancé</p>
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
            <Text>
              Vous pourrez tirer au sort le grand gagnant
              lorsque le jeu sera terminé
            </Text>
          </>
        )}

        {isGameLaunched && isGameEnded && (
          <>
            {hasWinner ? (
              <Box>
                <Text fontSize="xl">Le grand gagnant est:</Text>
                <Text>username: {winner.username}</Text>
                <Text>email: {winner.email}</Text>
                <Button mt='2em' onClick={resetWinner}>Reset winner</Button>
              </Box>
            ) : (
              <>
                <Text fontSize="2xl">Le jeu est terminé !</Text>
                <Button
                  onClick={defineWinner}
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Tirage au sort du grand gagnant
                </Button>
              </>
            )}
          </>
        )}


      </Stack>


    </Box>
  );
}

FinalWinner.propTypes = {
  game: PropTypes.object,
};

export default FinalWinner;
