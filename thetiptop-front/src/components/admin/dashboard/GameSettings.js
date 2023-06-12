import React, { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import addDays from 'date-fns/addDays';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';

import { gameService } from '../../../services/gameService';
import { MyLabel, MyModal } from '../../../styled-components';
import { DeleteIcon } from '@chakra-ui/icons';
import { ErrorContext } from '../../../context/ErrorContext';

const CustomInput = forwardRef(({ value, onClick, disabled },
    ref) => (
  <Input
    ref={ref}
    value={value}
    onClick={onClick}
    disabled={disabled}
    onChange={onClick}
    readOnly={disabled}
    borderTop='none'
    borderLeft='none'
    borderRight='none'
    borderColor={'green'}
    rounded='none'
    _focusVisible={{
      outline: 'none',
    }}
  />
));

CustomInput.displayName = 'CustomInput';

CustomInput.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

function GameSettings({
  game,
  setGame,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  /* eslint-disable-next-line no-unused-vars */
  const [state, dispatch] = useContext(ErrorContext);

  const gameStarted = Object.keys(game)?.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (gameStarted) {
      const result = await gameService.updateEndDate({ endDate });
      setGame(result.data.content);
      dispatch({
        type: 'SHOW_SUCCESS',
        payload: 'Date de fin modifiée !',
      });
    } else {
      const result = await gameService.startGame({ startDate, endDate });
      setGame(result.data.content);
      dispatch({
        type: 'SHOW_SUCCESS',
        payload: 'Le jeu est lancé !',
      });
    }
  };

  const deleteGame = async () => {
    await gameService.deleteGame();
    setGame({});
  };

  const endGame = async () => {
    const result = await gameService.endGame();
    setGame(result.data.content);
    setEndDate(new Date(result.data.content.endDate));
  };

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
      <form onSubmit={handleSubmit}>
        <Flex>
          <MyModal
            size="lg"
            toggle={
              <DeleteIcon
                color='brand.red'
                size='sm'
                cursor='pointer'
              />
            }
            header='Êtes-vous sur de vouloir supprimer le jeu?'
            body={
              <div>Vous pourrez alors en relancer un nouveau</div>
            }
            confirm={
              <Button
                variant="danger"
                onClick={deleteGame}
              >
          Supprimer définitivement
              </Button>}
            displayFooter={true}
            isClosableBottom={true}
          />
        </Flex>

        <Heading py='0.7em'>Game Settings</Heading>

        <Stack direction={['column', 'column', 'row']}>
          <Box>
            <MyLabel
              label="Start Date"
              htmlFor="startDate"
            />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              onSelect={(date) => setEndDate(addDays(date, 1))}
              customInput={<CustomInput />}
              dateFormat='dd / MM / yy'
              minDate={startDate}
              disabled={gameStarted ? true : false}
            />
          </Box>

          <Box>
            <MyLabel
              label="End Date"
              htmlFor="endDate"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              customInput={<CustomInput />}
              dateFormat='dd / MM / yy'
              minDate={endDate}
            />
          </Box>
        </Stack>

        <Button
          type="submit"
          w="full"
          mt="2em"
          variant={gameStarted ? 'secondary' : 'primary'}
        >
          {gameStarted ? 'Update end date' : 'Launch game'}
        </Button>

        {gameStarted && (
          <Button
            mt='5'
            variant="danger"
            onClick={endGame}
          >
            End the game
          </Button>
        )}

      </form>
    </Box>
  );
}

GameSettings.propTypes = {
  game: PropTypes.object,
  setGame: PropTypes.func,
  startDate: PropTypes.instanceOf(Date),
  setStartDate: PropTypes.func,
  endDate: PropTypes.instanceOf(Date),
  setEndDate: PropTypes.func,
};

export default GameSettings;
