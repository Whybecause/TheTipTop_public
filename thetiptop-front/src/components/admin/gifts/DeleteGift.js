import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import { MyModal } from '../../../styled-components';

const DeleteGift = ({ id, handleDelete }) => {
  return (
    <MyModal
      size="lg"
      toggle={
        <DeleteIcon w='20px' h='20px' color='red.500' cursor="pointer"/>
      }
      header='Êtes-vous sur de vouloir supprimer?'
      body={
        <div>Cette action est irréversible</div>
      }
      confirm={
        <Button
          variant="danger"
          onClick={() => handleDelete(id)}
        >
          Supprimer définitivement
        </Button>}
      displayFooter={true}
      isClosableBottom={true}
    />
  );
};

DeleteGift.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleDelete: PropTypes.func,
};

export default DeleteGift;
