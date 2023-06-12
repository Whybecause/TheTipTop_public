import {
  FiHome,
  FiUser,
  FiGift,
  FiSettings,
} from 'react-icons/fi';
import { RiGift2Fill } from 'react-icons/ri';

import { ROLES } from './roles';

export const NAV_LINKS = [
  { name: 'Qui-sommes-nous?', URL: '/about' },
];

export const AUTHENTICATED_LINKS = [
  {
    name: 'Dashboard',
    URL: '/admin',
    icon: FiHome,
    displayFor: [ROLES.ADMIN, ROLES.EMPLOYEE],
  },
  {
    name: 'Users',
    URL: '/admin/users',
    icon: FiUser,
    displayFor: [ROLES.ADMIN, ROLES.EMPLOYEE],
  },
  {
    name: 'Gifts',
    URL: '/admin/gifts',
    icon: FiGift,
    displayFor: [ROLES.ADMIN, ROLES.EMPLOYEE],
  },
  {
    name: 'Mes gains',
    icon: RiGift2Fill,
    URL: '/dashboard',
    displayFor: [ROLES.USER, ROLES.ADMIN, ROLES.EMPLOYEE],
  },
  {
    name: 'Paramètres',
    icon: FiSettings,
    URL: '/settings',
    displayFor: [ROLES.USER, ROLES.ADMIN, ROLES.EMPLOYEE],
  },
];
