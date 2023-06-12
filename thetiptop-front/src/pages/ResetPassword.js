import React, { useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { Button, FormErrorMessage } from '@chakra-ui/react';

import { ErrorContext } from '../context/ErrorContext';
import { authService } from '../services/authService';
import { MyInput } from '../styled-components';
import Layout from '../components/layout/Layout';

function ResetPassword() {
  /* eslint-disable-next-line no-unused-vars */
  const [state, dispatch] = useContext(ErrorContext);
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const newPassword = useRef({});
  newPassword.current = watch('newPassword', '');

  const onSubmitNewPassword = async (data) => {
    const result = await authService.submitNewPassword({
      ...data,
      token: searchParams.get('token'),
    });

    dispatch({
      type: 'SHOW_SUCCESS',
      payload: result.data.content,
    });
  };

  return (
    <Layout
      metaTitle="Réinitialisation du mot de passe"
      pageTitle="Réinitialisez votre mot de passe"
      withDefaultPadding={true}
    >
      <form onSubmit={handleSubmit(onSubmitNewPassword)}>
        <MyInput value="newPassword"
          type="password"
          label="Nouveau mot de passe"
          placeholder="Entrez votre nouveau mot de passe"
          id="newPassword"
          register={register}
          errors={errors}
          required={true}
        />
        <MyInput value="passwordConfirm"
          type="password"
          label="Confirmez le mot de passe"
          placeholder="Confirmez votre nouveau mot de passe"
          id="passwordConfirm"
          register={register}
          errors={errors}
          required={true}
          minLength={8}
          validate={(value) => value === newPassword.current}
        >
          {/* Manually set the error message
          We don't have a default error message as its custom validation */}
          {errors.passwordConfirm &&
            errors.passwordConfirm.type === 'validate' &&
            <FormErrorMessage fontWeight="bold">
              Les mots de passe ne sont pas identiques
            </FormErrorMessage>
          }
        </MyInput>
        <Button
          type="submit"
          isLoading={isSubmitting}
          w='full'
          mb="5"
        >
          Valider
        </Button>
      </form>
    </Layout>
  );
}

export default ResetPassword;
