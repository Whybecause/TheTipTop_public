import React from 'react';
import { mount } from 'cypress/react';
Cypress.Commands.add('mount', mount);

import App from '../../src/App';

describe('App.js', () => {
  it('mounts', () => {
    cy.mount(<App />);
  });
});
