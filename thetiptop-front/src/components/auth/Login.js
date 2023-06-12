// Import Third-party Dependencies
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { FcGoogle } from 'react-icons/fc';
import {
  Center,
  Text,
  Button,
} from '@chakra-ui/react';

// Import Internal Dependencies
import { authService } from '../../services/authService';
import { mailRegex } from '../../config/variables';
import { MyInput } from '../../styled-components';
import { ErrorContext } from '../../context/ErrorContext';

function Login() {
  /* eslint-disable-next-line no-unused-vars */
  const [state, dispatch] = useContext(ErrorContext);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onCredentialsSignIn(data) {
    await authService.login(data);
  }

  const onGoogleLogin = async (googleData) => {
    setIsLoading(true);
    await authService.googleLogin(googleData);
    setIsLoading(false);
  };

  const onGoogleFailure = (error) => {
    dispatch({
      type: 'SHOW_ERROR',
      payload: 'Something went wrong with Google, try again later',
    });
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        client: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  });

  return (
    <>
      <form
        data-cy='login-form'
        onSubmit={handleSubmit(onCredentialsSignIn)}
      >
        <MyInput value="email"
          type="email"
          label="Email"
          placeholder="Adresse Email"
          autoComplete="email"
          id="emailLogin"
          register={register}
          errors={errors}
          required={true}
          pattern={mailRegex}
          dataCy='login-email'
        />
        <MyInput value="password"
          type="password"
          label="Mot de passe"
          placeholder="Mot de passe"
          autoComplete="current-password"
          id="passwordLogin"
          register={register}
          errors={errors}
          required={true}
          minLength={8}
          dataCy='login-password'
        />
        <Button
          type="submit"
          isLoading={isSubmitting}
          w='full'
          mb="5"
        >
          Connexion
        </Button>
        <Center><Text color="grey">OU</Text></Center>

        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          render={(renderProps) => (
            <Button
              colorScheme="black"
              variant="outline"
              w='full'
              leftIcon={<FcGoogle />}
              mt="5"
              onClick={renderProps.onClick}
              isLoading={isLoading}
            >
            Se connecter avec Google
            </Button>
          )}
          onSuccess={onGoogleLogin}
          onFailure={onGoogleFailure}
          cookiePolicy={'single_host_origin'}
        />

      </form>
    </>
  );
};

export default Login;
