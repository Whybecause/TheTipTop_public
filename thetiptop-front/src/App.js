import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/alata';

import { getSessionCookie, SessionContext } from './context/SessionContext';
import { ErrorContextProvider } from './context/ErrorContext';
import overrides from './styles/overrides';
import { ROLES } from './config/roles';

import Protected from './helpers/Protected';
import Home from './pages/Home';
import About from './pages/About';
import UserDashboard from './pages/user/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ErrorToast from './components/error/ErrorToast';
import Page404 from './pages/Page404';
import AdminUsers from './pages/admin/AdminUsers';
import AdminUserEdit from './pages/admin/AdminUserEdit';
import UserSettings from './pages/user/UserSettings';
import AdminGifts from './pages/admin/AdminGifts';
import MyCookieConsent from './components/MyCookieConsent';
import ResetPassword from './pages/ResetPassword';
import { Contact } from './pages/Contact';
import { ConfidentialityPolicy } from './pages/legal/ConfidentialityPolicy';
import { CookiesPolicy } from './pages/legal/CookiesPolicy';
import { TermsOfUse } from './pages/legal/TermsOfUse';
import { LegalNotice } from './pages/legal/LegalNotice';

export default function App() {
  /* eslint-disable-next-line no-unused-vars */
  const [session, setSession] = useState(getSessionCookie());

  return (
    <SessionContext.Provider value={session}>
      <ChakraProvider theme={overrides}>
        <ErrorContextProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/legal/cookies" element={<CookiesPolicy />} />
              <Route
                path="/legal/confidentiality"
                element={<ConfidentialityPolicy />}
              />
              <Route path="/legal/terms-of-use" element={<TermsOfUse />} />
              <Route path="/legal/legal-notice" element={<LegalNotice />} />

              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/dashboard" element={
                <Protected
                  session={session}
                >
                  <UserDashboard />
                </Protected>
              } />
              <Route path="/admin" element={
                <Protected
                  session={session}
                  authorizedRoles={[ROLES.ADMIN, ROLES.EMPLOYEE]}
                >
                  <AdminDashboard />
                </Protected>
              } />
              <Route path="/admin/users" element={
                <Protected
                  session={session}
                  authorizedRoles={[ROLES.ADMIN, ROLES.EMPLOYEE]}
                >
                  <AdminUsers />
                </Protected>
              } />

              <Route path="/admin/user/:id" element={
                <Protected
                  session={session}
                  authorizedRoles={[ROLES.ADMIN, ROLES.EMPLOYEE]}
                >
                  <AdminUserEdit />
                </Protected>
              } />

              <Route path="/admin/gifts" element={
                <Protected
                  session={session}
                  authorizedRoles={[ROLES.ADMIN, ROLES.EMPLOYEE]}
                >
                  <AdminGifts />
                </Protected>
              } />

              <Route path="/settings" element={
                <Protected
                  session={session}
                >
                  <UserSettings />
                </Protected>
              } />

              <Route path="*" element={<Page404 />} />
            </Routes>
            <ErrorToast />
            <MyCookieConsent />
          </Router>
        </ErrorContextProvider>
      </ChakraProvider>
    </SessionContext.Provider>
  );
}
