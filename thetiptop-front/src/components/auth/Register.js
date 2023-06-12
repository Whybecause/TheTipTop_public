import React from 'react';
import { useForm } from 'react-hook-form';
import { FormHelperText, Button, Checkbox, Flex } from '@chakra-ui/react';

import { authService } from '../../services/authService';
import { MyInput } from '../../styled-components';
import { mailRegex } from '../../config/variables';

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onRegister(data) {
    await authService.register(data);
  }

  return (
    <form onSubmit={handleSubmit(onRegister)}>
      <MyInput value="username"
        type="text"
        label="Nom d'utilisateur"
        placeholder="Nom d'utilisateur"
        autoComplete="username"
        id="username"
        register={register}
        errors={errors}
        required={true}
        minLength={3}
        dataCy='register-username'
      />
      <MyInput value="firstName"
        type="text"
        label="Prénom"
        placeholder="Prénom"
        autoComplete="firstName"
        id="firstName"
        register={register}
        errors={errors}
        required={true}
        minLength={3}
        dataCy='register-firstName'
      />
      <MyInput value="lastName"
        type="text"
        label="Nom de famille"
        placeholder="Nom de famille"
        autoComplete="username"
        id="lastName"
        register={register}
        errors={errors}
        required={true}
        minLength={3}
        dataCy='register-lastName'
      />
      <MyInput value="email"
        type="email"
        label="Email"
        placeholder="Email"
        autoComplete="email"
        id="emailRegister"
        register={register}
        errors={errors}
        required={true}
        minLength={3}
        pattern={mailRegex}
        dataCy='register-email'
      >
        <FormHelperText>
          Nous ne partagerons pas votre email.
        </FormHelperText>
      </MyInput>

      <MyInput value="password"
        type="password"
        label="Mot de passe"
        placeholder="Mot de passe"
        autoComplete="current-password"
        id="passwordRegister"
        register={register}
        errors={errors}
        required={true}
        minLength={8}
        dataCy='register-password'
      />

      <Flex alignItems="center" justifyContent="center" gap={2} mb="5">
        <Checkbox defaultChecked
          id="acceptedNewsletter"
          name="acceptedNewsletter"
          {...register('acceptedNewsletter')}
        />
        <div>J&apos;accepte d&apos;être informé
          des actualités de ThéTipTop
        </div>
      </Flex>

      <Button
        type="submit"
        isLoading={isSubmitting}
        w='full'
      >
        S&apos;inscire
      </Button>

    </form>
  );
};

export default Register;
