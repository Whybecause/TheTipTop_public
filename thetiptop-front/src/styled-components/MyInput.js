// Import Third-party Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

// Import Internal Dependencies
import MyLabel from './MyLabel';
import FormError from './FormError';

const MyInput = ({
  type,
  id,
  value,
  label,
  placeholder,
  autoComplete,
  required,
  pattern,
  minLength,
  maxLength,
  valueAsNumber,
  register,
  errors,
  displayStar = required,
  children,
  defaultValue,
  validate,
  labelColor,
  errorColor,
  focusBorderColor = 'brand.green4',
  borderColor = 'brand.green2',
  bg = 'brand.green5',
  disabled = false,
  dataCy = '',
  leftIcon = null,
}) => {
  return (
    <FormControl id={id} mb="5"
      isInvalid={errors[value] ? true : false}
    >
      <MyLabel
        label={label}
        labelColor={labelColor}
        htmlFor={value}
        isRequired={required}
        displayStar={displayStar}
      />
      <InputGroup>
        {leftIcon && (
          <InputLeftElement pointerEvents="none">
            {leftIcon}
          </InputLeftElement>
        )}
        <Input
          data-cy={dataCy}
          focusBorderColor={focusBorderColor}
          borderColor={borderColor}
          bg={bg}
          {...register(
              `${value}`,
              {
                required: required,
                pattern: pattern,
                minLength: minLength,
                maxLength: maxLength,
                valueAsNumber: valueAsNumber,
                validate: validate,
              },
          )}
          type={type}
          id={id}
          name={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          disabled={disabled}
        />
      </InputGroup>

      <FormError errorColor={errorColor} errors={errors} value={value} />
      {children}
    </FormControl>
  );
};

MyInput.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
  pattern: PropTypes.instanceOf(RegExp),
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  valueAsNumber: PropTypes.bool,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  displayStar: PropTypes.bool,
  children: PropTypes.node,
  defaultValue: PropTypes.string,
  validate: PropTypes.func,
  labelColor: PropTypes.string,
  errorColor: PropTypes.string,
  focusBorderColor: PropTypes.string,
  borderColor: PropTypes.string,
  bg: PropTypes.string,
  disabled: PropTypes.bool,
  dataCy: PropTypes.string,
  leftIcon: PropTypes.node,
};

export default MyInput;
