import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { mount } from 'cypress/react';

import Home from '../../../src/pages/Home';
import overrides from '../../../src/styles/overrides';

Cypress.Commands.add('mount', (component, options = {}) => {
  const { routerProps = { initialEntries: ['/'] }, ...mountOptions } = options;

  const wrapped =
    <MemoryRouter {...routerProps}>
      <ChakraProvider theme={overrides}>
        {component}
      </ChakraProvider>
    </MemoryRouter>;

  return mount(wrapped, mountOptions);
});

describe('<Home>', () => {
  it('mounts', () => {
    cy.mount(
        <Home />,
    );
  });
});
