import Cookies from 'js-cookie';
import { getSessionCookie } from '../../src/context/SessionContext';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add(
// 'drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add(
// 'dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --


// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// CYPRESS_DEV_API is loaded from cypress.config.js
const apiUrl = Cypress.env('DEV_API');

Cypress.Commands.add('login', (user) => {
  cy.request('POST', `${apiUrl}/login`, {
    email: user.email,
    password: user.password,
  })
      .then((response) => {
        Cookies.remove('session');
        Cookies.set(
            'session',
            JSON.stringify(response.body.content),
            { expires: 14 },
        );
      });
});

Cypress.Commands.add('loginAdmin', () => {
  cy.fixture('defaultAdmin').then((admin) => {
    cy.login(admin);
  });
});

Cypress.Commands.add('register', (data) => {
  cy.request({
    method: 'POST',
    url: `${apiUrl}/user`,
    body: data,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('requestByUserId', (method, url, data = {}) => {
  const session = getSessionCookie();
  const options = {
    method,
    url: `${apiUrl}${url}/${session.id}`,
    headers: {
      'Authorization': `Bearer ${session.accessToken}`,
    },
  };
  cy.request(options);
});

Cypress.Commands.add(
    'authRequest',
    (method, url, data = {}, failOnStatusCode = true) => {
      const session = getSessionCookie();
      const options = {
        method,
        url: `${apiUrl}${url}`,
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
        },
        failOnStatusCode,
        body: data,
      };
      cy.request(options);
    });

// ----------------------- GAME COMMANDS -------------------------------------

Cypress.Commands.add('createGame', (startDate, endDate) => {
  cy.loginAdmin();

  let start;
  let end;

  if (!startDate && !endDate) {
    start = new Date();
    end = new Date();
    end.setDate(end.getDate() + 30);
  } else {
    start = startDate;
    end = endDate;
  }

  cy.authRequest('POST', '/game', { startDate: start, endDate: end });
});

Cypress.Commands.add('createEndedGame', () => {
  const startDate = new Date('august 19, 2000');
  const endDate = new Date('august 29, 2000');
  cy.createGame(startDate, endDate);
});

Cypress.Commands.add('setWinner', () => {
  cy.loginAdmin();
  cy.authRequest('PATCH', '/game/winner');
});

// ----------------------- GIFT COMMANDS -------------------------------------

Cypress.Commands.add('createGifts', (giftAmount) => {
  cy.loginAdmin();
  cy.authRequest('POST', '/gift', { giftAmount });
});

Cypress.Commands.add('deleteGifts', () => {
  cy.loginAdmin();
  cy.authRequest('DELETE', '/gift');
});

Cypress.Commands.add('pickCode', () => {
  cy.loginAdmin();
  cy.authRequest('GET', '/gift/code', {}, false);
});

Cypress.Commands.add('submitCode', (code, user) => {
  if (user) {
    cy.login(user);
  }
  cy.authRequest('POST', '/gift/submit-code', { code }, false);
});


