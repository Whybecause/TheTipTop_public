import React from 'react';
import propTypes from 'prop-types';
import { MySpinner } from '../../styled-components';

const Loading = ({ isLoading, children }) => {
  let content;

  if (isLoading) {
    content = (
      <MySpinner />
    );
  } else {
    content = (children);
  }

  return (<>{content}</>);
};

Loading.propTypes = {
  isLoading: propTypes.bool.isRequired,
  children: propTypes.node.isRequired,
};

export default Loading;
