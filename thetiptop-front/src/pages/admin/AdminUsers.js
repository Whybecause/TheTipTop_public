import React, { useState } from 'react';

import useApiError from '../../hooks/useApiError';
import { userService } from '../../services/userService';
import Layout from '../../components/layout/Layout';
import SearchWrapper from '../../components/shared/SearchWrapper';
import EmailExport from '../../components/admin/dashboard/EmailExport';

function AdminUsers() {
  const [users, setUser] = useState([]);
  const [filtersFromParams, setFiltersFromParams] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, updateApiError, resetApiError] = useApiError();

  const ALLOWED_PARAMS_FILTERS = {
    role: ['ALL', 'USER', 'ADMIN', 'EMPLOYEE'],
    acceptedNewsletter: ['ALL', 'TRUE', 'FALSE'],
  };

  const searchProps = (value) =>
    [value.username, value.firstName, value.lastName, value.email];

  const fetchUsers = async () => {
    try {
      const users = await userService.getAll();
      setUser(users.data.content);
      setIsLoading(false);
      resetApiError();
    } catch (error) {
      setIsLoading(false);
      updateApiError(error);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout
      pageTitle="Users"
      metaTitle="Users"
      width='8xl'
      showAdminSidebar={true}
      withDefaultPadding={true}
    >
      <EmailExport />
      <SearchWrapper
        searchType='users'
        data={users}
        searchProps={searchProps}
        filtersFromParams={filtersFromParams}
        setFiltersFromParams={setFiltersFromParams}
        isLoading={isLoading}
        ALLOWED_PARAMS_FILTERS={ALLOWED_PARAMS_FILTERS}
        apiError={apiError}
      />
    </Layout>
  );
}

export default AdminUsers;
