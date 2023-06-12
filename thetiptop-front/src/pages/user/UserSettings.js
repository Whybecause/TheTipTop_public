import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { SessionContext, setSessionCookie } from '../../context/SessionContext';
import UserEdit from '../../components/shared/UserEdit';
import Layout from '../../components/layout/Layout';
import { Button, Divider, Flex } from '@chakra-ui/react';
import UserDelete from '../../components/shared/UserDelete';
import { userService } from '../../services/userService';
import { ErrorContext } from '../../context/ErrorContext';

// Shows the user edit form for current logged in user
const UserSettings = () => {
  /* eslint-disable-next-line no-unused-vars */
  const [state, dispatch] = useContext(ErrorContext);
  const session = useContext(SessionContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleUserSave = async (data) => {
    const result = await userService.update(session.id, data);
    dispatch({
      type: 'SHOW_SUCCESS',
      payload: result.data.message,
    });
    setSessionCookie({ ...session, ...result.data.content });
  };


  return (
    <Layout
      pageTitle={session.username}
      metaTitle={session.username}
      withDefaultPadding={true}
    >
      <form onSubmit={handleSubmit(handleUserSave)}>

        <UserEdit user={session} register={register} errors={errors} />

        <Flex
          mt={['1em', null, null, null]}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            type="submit"
            variant="secondary"
            isLoading={isSubmitting}
          >
          Sauvegarder les changements
          </Button>
        </Flex>
      </form>

      <Divider my='2em'/>
      <UserDelete userId={session.id} setUser={null} />

    </Layout>
  );
};

export default UserSettings;
