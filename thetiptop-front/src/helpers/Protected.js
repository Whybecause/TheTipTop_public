import React from 'react';
import PropTypes from 'prop-types';

import { Navigate } from 'react-router-dom';
import { ROLES } from '../config/roles';

const Protected = ({
  session,
  authorizedRoles = Object.keys(ROLES).map((role) => role),
  children,
}) => {
  if (!session || !authorizedRoles.includes(session.role)) {
    return <Navigate to='/' replace />;
  }

  return children;
};

Protected.propTypes = {
  session: PropTypes.object,
  authorizedRoles: PropTypes.array,
  children: PropTypes.node.isRequired,
};

export default Protected;
