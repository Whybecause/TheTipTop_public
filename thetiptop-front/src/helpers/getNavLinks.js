import { getSessionCookie } from '../context/SessionContext';
import { NAV_LINKS, AUTHENTICATED_LINKS } from '../config/navLinks';

export const getNavLinks = () => {
  return NAV_LINKS;
};

export const getAuthenticatedLinks = () => {
  const user = getSessionCookie();

  if (!user || !user.role) {
    return [];
  }

  return AUTHENTICATED_LINKS.filter((link) =>
    link.displayFor.includes(user.role),
  );
};
