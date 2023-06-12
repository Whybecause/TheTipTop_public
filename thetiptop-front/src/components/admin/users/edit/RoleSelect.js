import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Select } from '@chakra-ui/react';

import { MyLabel } from '../../../../styled-components';
import { ROLES } from '../../../../config/roles';
import { SessionContext } from '../../../../context/SessionContext';

const RoleSelect = ({ user, register }) => {
  const session = useContext(SessionContext);
  const ALLOWED_ROLE = [ROLES.ADMIN, ROLES.EMPLOYEE];
  const isAllowed = ALLOWED_ROLE.includes(session.role);

  const [roleSelected, setRoleSelected] = React.useState(user?.role);

  const handleSelectChange = (e) => {
    setRoleSelected(e.target.value);
  };

  return (
    <FormControl w={['100%', '50%', '50%', '25%']} margin='0 auto' mb='5'>
      <MyLabel label="Role" htmlFor="role" />
      <Select
        value={roleSelected}
        name="role"
        focusBorderColor='brand.green4'
        borderColor='brand.green2'
        bg='brand.green5'
        {...register('role')}
        onChange={handleSelectChange}
      >
        {Object.keys(ROLES).map((role) => (
          <option disabled={!isAllowed} key={role} value={role}>
            {role}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

RoleSelect.propTypes = {
  user: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
};

export default RoleSelect;
