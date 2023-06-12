import { useMemo } from 'react';

/**
 *
 * @param {string} value the value of a filter type we get from params
 * @return {(string|bool)} the original value or the value converted to bool
 */
const applyConvert = (value) => {
  if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
    return value.toLowerCase() === 'true' ? true : false;
  }

  return value;
};

/**
 *
 * @param {Array} items a list of data to search through
 * @param {Object} filters  a list of filters to apply to the search
 * @return {Array} the list of items filtered by the filters
 */
const getFilteredResults = (items, filters) => {
  // If no filters return all results
  if (Object.keys(filters)?.length === 0) {
    return items;
  }

  let filtered = items;

  for (const [key, value] of Object.entries(filters)) {
    if (value !== 'ALL') {
      // This handles a special case:
      // To know if a gift has been played, we check if it has a UserId
      if (key === 'played') {
        const newKey = 'UserId';
        if (value === 'TRUE') {
          filtered = filtered.filter((item) => item[newKey] !== null);
        }
        if (value === 'FALSE') {
          filtered = filtered.filter((item) => item[newKey] === null);
        }
      } else {
        // This handles all other filters
        filtered = filtered.filter((item) => item[key] === applyConvert(value));
      }
    }
  }
  return filtered;
};

/**
 *
 * @param {Array} items list of data to search through
 * @param {String} searchText the value to search for
 * @param {Object} filters filters to pass to getFilteredResults()
 * @param {Array} searchProps the properties to search through
 * @return {Array} the list of items filtered
 * by the filters and the searchText query
 */
const useSearchable = (items, searchText, filters, searchProps) => {
  return useMemo(() => {
    const regex = new RegExp(searchText, 'i');
    if (items?.length) {
      const filteredResults = getFilteredResults(items, filters);

      // Used to get result of the query search
      return filteredResults.filter((item) =>
        searchProps(item).some((sp) => regex.test(sp)),
      );
    }
  }, [items, searchText, searchProps]);
};

export default useSearchable;
