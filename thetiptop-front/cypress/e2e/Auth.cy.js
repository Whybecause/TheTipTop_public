// const userAccount = {
//   username: 'username',
//   firstName: 'firstName',
//   lastName: 'lastName',
//   email: 'email@email1.com',
//   password: 'passwordpassword',
// };

// describe('The Home Page', () => {
//   beforeEach(() => {
//     // This admin account is already created by the server on init
//     // So we just have to login
//     cy.loginAdmin();

//     // Delete all accounts with USER role
//     cy.authRequest('DELETE', '/user');

//     // Log out
//     cy.clearCookies();

//     cy.visit('/');
//   });

//   it('successfully register and logs in user account', () => {
//     cy.get('[data-cy=auth-modal]').click();
//     cy.get('[data-cy=login-form]').should('be.visible');
//     cy.get('[data-cy=register-tab]').click();
//     cy.get('[data-cy=register-username]').type(userAccount.username);
//     cy.get('[data-cy=register-firstName]').type(userAccount.firstName);
//     cy.get('[data-cy=register-lastName]').type(userAccount.lastName);
//     cy.get('[data-cy=register-email]').type(userAccount.email);
//     cy.get('[data-cy=register-password]').type(userAccount.password)
//         .type('{enter}');

//     // Hack overwise cookies are not same on react and on cypress (in the CI)
//     cy.login(userAccount);

//     cy.visit('/');
//     cy.location('pathname').should('include', '/');
//     cy.get('[data-cy=user-initials]').should('contain', 'FL');
//     cy.getCookie('session').should('exist');
//   });

//   it('successfully logs in', () => {
//     cy.register(userAccount);

//     cy.get('[data-cy=auth-modal]').click();
//     cy.get('[data-cy=login-form]').should('be.visible');
//     cy.get('[data-cy=login-email]').type(userAccount.email);
//     cy.get('[data-cy=login-password]').type(userAccount.password)
//         .type('{enter}');

//     // Hack
//     cy.login(userAccount);

//     cy.location('pathname').should('include', '/');
//     cy.get('[data-cy=user-initials]').should('contain', 'FL');
//     cy.getCookie('session').should('exist');
//   });

//   it('successfully logs out', () => {
//     cy.register(userAccount);
//     cy.login(userAccount);

//     cy.visit('/');

//     cy.get('[data-cy=auth-nav-button]').click();
//     cy.get('[data-cy=logout-button]').should('be.visible').click();
//     cy.location('pathname').should('include', '/');

//     cy.getCookie('session').should('not.exist');
//     cy.clearCookies();
//   });
// });
