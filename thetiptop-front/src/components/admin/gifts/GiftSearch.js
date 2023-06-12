import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, Input, Select, SimpleGrid } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { MyLabel } from '../../../styled-components';

function GiftSearch({
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
      <FormControl id="code">
        <MyLabel labelColor="white" label="Search" htmlFor="code" />
        <Input
          type="text"
          focusBorderColor='brand.green4'
          borderColor='brand.green2'
          bg='brand.green5'
          {...searchInput}
          placeholder="Search a code, gift type..."
        />
      </FormControl>

      <FormControl id="picked">
        <MyLabel
          labelColor="white"
          label="Picked"
          htmlFor="picked"
        />
        <Select
          value={
            searchParams.get('picked') ?
            searchParams.get('picked') : 'ALL'
          }
          focusBorderColor='brand.green4'
          borderColor='brand.green2'
          bg='brand.green5'
          name="picked"
          onChange={handleFilterChange}
        >
          {ALLOWED_PARAMS_FILTERS['picked'].map((value) => (
            <option key={value}>{value}</option>
          ))}
        </Select>
      </FormControl>

      <FormControl id="played">
        <MyLabel
          labelColor="white"
          label="Played"
          htmlFor="played"
        />
        <Select
          value={
            searchParams.get('played') ?
            searchParams.get('played') : 'ALL'
          }
          focusBorderColor='brand.green4'
          borderColor='brand.green2'
          bg='brand.green5'
          name="played"
          onChange={handleFilterChange}
        >
          {ALLOWED_PARAMS_FILTERS['played'].map((value) => (
            <option key={value}>{value}</option>
          ))}
        </Select>
      </FormControl>

      <FormControl id="checkedOut">
        <MyLabel
          labelColor="white"
          label="Checked Out"
          htmlFor="checkedOut"
        />
        <Select
          value={
            searchParams.get('checkedOut') ?
            searchParams.get('checkedOut') : 'ALL'
          }
          focusBorderColor='brand.green4'
          borderColor='brand.green2'
          bg='brand.green5'
          name="checkedOut"
          onChange={handleFilterChange}
        >
          {ALLOWED_PARAMS_FILTERS['checkedOut'].map((value) => (
            <option key={value}>{value}</option>
          ))}
        </Select>
      </FormControl>
    </SimpleGrid>
  );
}

GiftSearch.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  searchInput: PropTypes.object.isRequired,
  ALLOWED_PARAMS_FILTERS: PropTypes.object.isRequired,
};

export default GiftSearch;
