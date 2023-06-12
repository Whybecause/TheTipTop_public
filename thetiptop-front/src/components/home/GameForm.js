import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Container,
  useDisclosure,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';

import { SessionContext } from '../../context/SessionContext';
import { giftService } from '../../services/giftService';
import { MyInput } from '../../styled-components';
import GameResult from './GameResult';
import { ErrorContext } from '../../context/ErrorContext';
import { trackSubmitCode } from '../../helpers/googleAnalytics';


function GameForm() {
  const session = useContext(SessionContext);
  /* eslint-disable-next-line no-unused-vars */
  const [state, dispatch] = useContext(ErrorContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { isOpen, onToggle } = useDisclosure();
  const [gift, setGift] = useState({});

  const submitCode = async (data) => {
    if (!session) {
      dispatch({
        type: 'SHOW_ERROR',
        payload: 'Connectez-vous pour participer au jeu',
      });
    } else {
      try {
        const result = await giftService.submitCode(data);
        setGift(result.data.content);
        onToggle();
        trackSubmitCode(session.id);
      } catch (error) {
        console.log(error);
      }
    }
  };


  return (
    <Container maxW="md" p="5" style={{ margin: '0px' }}>

      {Object.keys(gift).length > 0 && (
        <GameResult gift={gift} onToggle={onToggle} isOpen={isOpen}/>
      )}

      <form onSubmit={handleSubmit(submitCode)}>
        <MyInput value="code"
          type="text"
          label="Entrez votre code à 10 chiffres"
          placeholder="XXXXXXXXXX"
          autoComplete="code"
          id="code"
          register={register}
          errors={errors}
          maxLength={10}
          minLength={10}
          validate={(value) => value > 0}
        >
          {/* Manually set the error message
          We don't have a default error message as its custom validation */}
          {errors.code && errors.code.type === 'validate' &&
            <FormErrorMessage fontWeight="bold">
              Veuillez entrez des chiffres uniquement
            </FormErrorMessage>
          }
        </MyInput>
        <Button
          type="submit"
          isLoading={isSubmitting}
          w='full'
        >
          Jouer
        </Button>
      </form>
    </Container>
  );
}

export default GameForm;
