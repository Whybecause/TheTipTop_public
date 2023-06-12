// Import Third-party Dependencies
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@chakra-ui/react';

// Import Internal Dependencies
import { ErrorContext } from '../../context/ErrorContext';
import { authService } from '../../services/authService';
import { MyInput } from '../../styled-components';

const ResetPassword = () => {
  /* eslint-disable-next-line no-unused-vars */
  const [state, dispatch] = useContext(ErrorContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onRequestResetPasswordLink(data) {
    const result = await authService.requestResetPasswordLink(data);
    dispatch({
      type: 'SHOW_SUCCESS',
      payload: result.data.content,
    });
  }

  return (
    <form onSubmit={handleSubmit(onRequestResetPasswordLink)}>
      <MyInput value="email"
        type="email"
        label="Obtenez un lien de réinitialisation par email"
        placeholder="Entrez votre email"
        id="passwordReset"
        register={register}
        errors={errors}
        required={true}
      />
      <Button type="submit" w='full' isLoading={isSubmitting}>Envoyer</Button>
    </form>
  );
};

export default ResetPassword;
