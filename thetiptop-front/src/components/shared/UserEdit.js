import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Box, Checkbox, SimpleGrid, Text } from '@chakra-ui/react';

import { MyInput } from '../../styled-components';
import { mailRegex } from '../../config/variables';
import { SessionContext } from '../../context/SessionContext';

const UserEdit = ({ user, register, errors }) => {
  const session = useContext(SessionContext);
  const params = useParams();
  const isOwner =
    session.id === Number(user.id) || session.id === Number(params.id);

  return (
    <SimpleGrid columns={[1, 2, 1, 2]} spacing={4}>
      <MyInput value="username"
        type="text"
        id="username"
        label="Nom d'utilisateur"
        defaultValue={user.username}
        register={register}
        errors={errors}
        required={true}
      />
      <MyInput value="email"
        type="email"
        id="email"
        label="Email"
        defaultValue={user.email}
        register={register}
        errors={errors}
        required={user.googleId ? false : true}
        pattern={mailRegex}
        disabled={user.googleId ? true : false}
      />
      <MyInput value="firstName"
        type="text"
        id="firstName"
        label="Prénom"
        defaultValue={user.firstName}
        register={register}
        errors={errors}
        required={true}
      />
      <MyInput value="lastName"
        type="text"
        id="lastName"
        label="Nom de famille"
        defaultValue={user.lastName}
        register={register}
        errors={errors}
        required={true}
      />
      {isOwner && (
        <Box display="flex">
          <Text>Souscrire à la newsletter</Text>
          <Checkbox
            ml='3'
            defaultChecked={user.acceptedNewsletter ? true : false}
            id="acceptedNewsletter"
            name="acceptedNewsletter"
            {...register('acceptedNewsletter')}
          />
        </Box>
      )}
    </SimpleGrid>
  );
};

UserEdit.propTypes = {
  user: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default UserEdit;
