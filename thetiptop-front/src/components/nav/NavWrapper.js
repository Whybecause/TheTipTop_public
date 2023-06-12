import React, { useState, useContext } from 'react';

import { SessionContext } from '../../context/SessionContext';
import Auth from '../auth/Auth.wrapper';
import UserMenu from './UserMenu';
import Nav from './Nav';

export default function NavWrapper() {
  const user = useContext(SessionContext);
  const [initials, setInitials] = useState('');

  React.useEffect(() => {
    if (user?.firstName && user?.lastName) {
      setInitials(
          user?.firstName.substring(0, 1).toUpperCase() +
        user?.lastName.substring(0, 1).toUpperCase(),
      );
    }
  }, [user]);


  return (
    <Nav>
      {user ? <UserMenu initials={initials} /> : <Auth />}
    </Nav>
  );
}
