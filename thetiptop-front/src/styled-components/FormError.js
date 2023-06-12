// Import Third-party Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { FormErrorMessage } from '@chakra-ui/react';

const FormError = ({ errors, value, errorColor }) => {
  return (
    <>
      {errors[value] && errors[value].type === 'required' && (
        <FormErrorMessage fontWeight="bold" color={errorColor}>
          Ce champs est requis
        </FormErrorMessage>
      )}
      {errors[value] && errors[value].type === 'pattern' && (
        <FormErrorMessage fontWeight="bold">
          {value} invalide
        </FormErrorMessage>
      )}
      {errors[value] && errors[value].type === 'minLength' && (
        <FormErrorMessage color={errorColor} fontWeight="bold">
          Ce champs est trop court
        </FormErrorMessage>
      )}
      {errors[value] && errors[value].type === 'maxLength' && (
        <FormErrorMessage fontWeight="bold" color={errorColor}>
          Ce champs est trop long
        </FormErrorMessage>
      )}
    </>
  );
};

FormError.propTypes = {
  errors: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  errorColor: PropTypes.string,
};

export default FormError;
