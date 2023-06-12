import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Box, Button, Divider, Flex, Heading } from '@chakra-ui/react';

import { giftService } from '../../../services/giftService';
import { MyInput, MyModal } from '../../../styled-components';
import { ErrorContext } from '../../../context/ErrorContext';
import { DeleteIcon } from '@chakra-ui/icons';

function GenerateGifts({ setGiftCreated }) {
  /* eslint-disable-next-line no-unused-vars */
  const [state, dispatch] = useContext(ErrorContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onGenerateGifts = async (data) => {
    const result = await giftService.create(data);
    dispatch({
      type: 'SHOW_SUCCESS',
      payload: result.data.content,
    });
    setGiftCreated(true);
  };

  const onDeleteAll = async () => {
    const result = await giftService.deleteAll();
    dispatch({
      type: 'SHOW_SUCCESS',
      payload: result.data.content,
    });
    setGiftCreated(false);
  };

  const onGetGiftCode = async () => {
    const result = await giftService.getGiftCode();
    alert(result.data.content);
  };

  return (
    <Box
      p='5'
      rounded='lg'
      border="1px solid gray"
      display="flex"
      justifyContent="center"
      alignItems="center"
      maxW='4xl'
      margin='0 auto'
    >
      <form onSubmit={handleSubmit(onGenerateGifts)}>
        <Flex flexDir="column">
          <MyModal
            toggle={
              <DeleteIcon
                color='brand.red'
                size='sm'
                cursor='pointer'
              />
            }
            header='Supprimer les gifts'
            body={
              <p>
                Êtes-vous sur de vouloir supprimer tous les gifts existants?
              </p>
            }
            confirm={
              <Button
                variant="danger"
                onClick={onDeleteAll}
              >
              Supprimer
              </Button>
            }
            displayFooter={true}
            closeButton={true}
          />
        </Flex>

        <Heading py='0.7em'>Gifts Settings</Heading>

        <MyInput value="giftAmount"
          type="number"
          label="Nombre de gifts à créer"
          placeholder="100"
          id="giftAmount"
          register={register}
          errors={errors}
          required={true}
        />
        <Button
          type="submit"
          mb='1em'
          w="full"
          isLoading={isSubmitting}
        >
          Generate Gifts
        </Button>

        <Divider mb='5'/>

        <Button
          w="full"
          variant="outline"
          onClick={onGetGiftCode}
        >
          Pick a gift code
        </Button>

      </form>

    </Box>
  );
}

GenerateGifts.propTypes = {
  setGiftCreated: PropTypes.func,
};

export default GenerateGifts;
