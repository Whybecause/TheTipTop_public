import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, Input, Select, SimpleGrid } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { MyLabel } from '../../../styled-components';

function UserSearch({
  handleFilterChange,
  searchInput,
  ALLOWED_PARAMS_FILTERS,
}) {
  const [searchParams] = useSearchParams();

  return (
    <SimpleGrid
      columns={[1, 1, 1, 2]}
      spacing={[2, 2, 2, 10]}
      bg='brand.green6'
      p='5'
      mb='5'
      rounded='lg'
    >
      <FormControl id="query">
        <MyLabel labelColor="white" label="Query" htmlFor="query" />
        <Input
          type="text"
          focusBorderColor='brand.green4'
          borderColor='brand.green2'
          bg='brand.green5'
          {...searchInput}
          placeholder="Type a name, email..."
        />
      </FormControl>

      <FormControl id='role'>
        <MyLabel labelColor="white" label='Role' htmlFor='role' />
        <Select
          value={
            searchParams.get('role') ? searchParams.get('role') : 'ALL'
          }
          focusBorderColor='brand.green4'
          borderColor='brand.green2'
          bg='brand.green5'
          name="role"
          onChange={handleFilterChange}
        >
          {ALLOWED_PARAMS_FILTERS['role'].map((value) => (
            <option key={value}>{value}</option>
          ))}
        </Select>
      </FormControl>

      <FormControl id="newsletter">
        <MyLabel
          labelColor="white"
          label="Accepted Newsletter"
          htmlFor="newsletter"
        />
        <Select
          value={
      searchParams.get('acceptedNewsletter') ?
      searchParams.get('acceptedNewsletter') : 'ALL'
          }
          focusBorderColor='brand.green4'
          borderColor='brand.green2'
          bg='brand.green5'
          name="acceptedNewsletter"
          onChange={handleFilterChange}
        >
          <option value='ALL'>ALL</option>
          <option value='TRUE'>TRUE</option>
          <option value='FALSE'>FALSE</option>
        </Select>
      </FormControl>
    </SimpleGrid>
  );
}

UserSearch.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  searchInput: PropTypes.object.isRequired,
  ALLOWED_PARAMS_FILTERS: PropTypes.object.isRequired,
};

export default UserSearch;
