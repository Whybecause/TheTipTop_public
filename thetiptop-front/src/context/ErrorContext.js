import React, { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';

export const ErrorContext = createContext();

const initialState = {
  content: null,
  showContent: false,
  success: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_ERROR':
      return {
        content: action.payload,
        showContent: true,
        success: false,
        position: 'top',
      };
    case 'SHOW_SUCCESS':
      return {
        content: action.payload,
        showContent: true,
        success: true,
        position: 'bottom',
      };
    case 'RESET':
      return initialState;
  }
};

export const ErrorContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ErrorContext.Provider value={[state, dispatch]}>
      {children}
    </ErrorContext.Provider>
  );
};

ErrorContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
