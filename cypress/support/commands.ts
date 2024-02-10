declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(name: string, roles: string): any;
  }
}

Cypress.Commands.add('login', (name, roles) => {
  cy.intercept(
    {
      method: 'GET',
      url: '/api/auth/me',
    },
    {
      id: 1,
      name,
      email: 'test@test.com',
      roles,
    }
  );
  cy.visit('');
  cy.url().should('include', '/main');
});
