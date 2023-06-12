import React from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

import useUserInput from '../../hooks/useUserInput';
import useSearchable from '../../hooks/useSearchable';
import UserSearch from '../admin/users/UserSearch';
import UserTableList from '../admin/users/UserTableList';
import GiftSearch from '../admin/gifts/GiftSearch';
import GiftTableList from '../admin/gifts/GiftTableList';
import { ApiErrorMessage } from '../error/ApiErrorMessage';


function SearchWrapper({
  searchType,
  data,
  searchProps,
  filtersFromParams,
  setFiltersFromParams,
  isLoading,
  ALLOWED_PARAMS_FILTERS,
  handleCheckout,
  handleDelete,
  apiError,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = React.useState(Number(searchParams.get('page')) || 1);

  const searchInput = useUserInput('');
  const searchedData = useSearchable(
      data,
      searchInput.value,
      filtersFromParams,
      searchProps,
  );

  // Used on render to get filters filled with correct settings
  const getFiltersFromParams = () => {
    for (const entry of searchParams.entries()) {
      const filterType = entry[0];
      const filterValue = entry[1];

      const isValid = ALLOWED_PARAMS_FILTERS[filterType]?.some(
          (value) => value === filterValue,
      );

      if (isValid) {
        setFiltersFromParams((prevState) => (
          { ...prevState, [filterType]: filterValue }
        ));
      }
    }
  };

  React.useEffect(() => {
    getFiltersFromParams();
  }, []);

  const handlePageChange = (page) => {
    setPage(page);
    setSearchParams({
      ...filtersFromParams,
      page: page,
    });
  };

  const handleFilterChange = (event) => {
    setSearchParams({
      ...filtersFromParams,
      [event.target.name]: event.target.value,
    });
    // Reset the page
    setPage(1);

    // This makes the useSearchable rettriger to filter the results
    setFiltersFromParams((prevState) => (
      { ...prevState, [event.target.name]: event.target.value }
    ));
  };

  return (
    <>
      {searchType === 'users' && (
        <>
          <UserSearch
            handleFilterChange={handleFilterChange}
            searchInput={searchInput}
            ALLOWED_PARAMS_FILTERS={ALLOWED_PARAMS_FILTERS}
          />
          <ApiErrorMessage apiError={apiError} />
          <UserTableList
            users={searchedData}
            page={page}
            handlePageChange={handlePageChange}
            isLoading={isLoading}
          />
        </>
      )}
      {searchType === 'gifts' && (
        <>
          <GiftSearch
            handleFilterChange={handleFilterChange}
            searchInput={searchInput}
            ALLOWED_PARAMS_FILTERS={ALLOWED_PARAMS_FILTERS}
          />
          <ApiErrorMessage apiError={apiError} />
          <GiftTableList
            gifts={searchedData || []}
            page={page}
            setPage={setPage}
            handlePageChange={handlePageChange}
            handleCheckout={handleCheckout}
            handleDelete={handleDelete}
            isLoading={isLoading}
          />
        </>
      )}

    </>
  );
}

SearchWrapper.propTypes = {
  searchType: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  searchProps: PropTypes.func.isRequired,
  filtersFromParams: PropTypes.object.isRequired,
  setFiltersFromParams: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  ALLOWED_PARAMS_FILTERS: PropTypes.object.isRequired,
  handleCheckout: PropTypes.func,
  handleDelete: PropTypes.func,
  apiError: PropTypes.object,
};

export default SearchWrapper;
