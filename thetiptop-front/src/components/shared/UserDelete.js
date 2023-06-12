import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import { ErrorContext } from '../../context/ErrorContext';
import { MyModal } from '../../styled-components';
import { userService } from '../../services/userService';
import { authService } from '../../services/authService';

const UserDelete = ({ userId, setUser }) => {
  const navigate = useNavigate();
  /* eslint-disable-next-line no-unused-vars */
  const [state, dispatch] = useContext(ErrorContext);

  const handleDelete = async () => {
    const result = await userService.deleteUser(userId);
    if (result.data.content.shouldLogout) {
      authService.logout();
      navigate('/');
    }
    dispatch({
      type: 'SHOW_SUCCESS',
      payload: result.data.content.message,
    });

    // For admin when deleting a user account so content refresh
    if (setUser) {
      setUser({ username: 'Deleted User' });
    }
  };

  return (
    <MyModal
      size="lg"
      toggle={
        <Button variant='danger' mb='5'>
          <DeleteIcon />
          <Text pl='2'>Supprimer le compte</Text>
        </Button>
      }
      header='Êtes-vous sur de vouloir supprimer votre compte?'
      body={
        <div>Cette action est irréversible</div>
      }
      confirm={
        <Button
          variant="danger"
          onClick={handleDelete}
        >
        Supprimer définitivement
        </Button>}
      displayFooter={true}
      isClosableBottom={true}
    />
  );
};

UserDelete.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setUser: PropTypes.func,
};

export default UserDelete;
