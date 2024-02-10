describe('Login spec', () => {
  it('autoLogin works when user is already connected', () => {
    cy.login('Ishta', 'ROLE_USER');
  });

  it('login works with correct credentials', () => {
    //Given
    cy.visit('/login');
    cy.intercept('POST', '/api/auth/login', {
      body: {
        token: 'azertyuiop',
      },
    });
    cy.intercept(
      {
        method: 'GET',
        url: '/api/auth/me',
      },
      {
        id: 1,
        name: 'Ishta',
        email: 'test@test.com',
        roles: 'ROLE_USER,ROLE_ADMIN',
      }
    ).as('user');

    //When
    cy.get('input[formControlName=email]').type('mail@fake.fr');
    cy.get('input[formControlName=password]').type('Aa123456!');
    cy.get('[data-cy="submit"]').click();

    //Then
    cy.url().should('include', '/main');
    cy.get('.admin').should('exist');
  });

  it('login doesnt work with wrong credentials', () => {
    //Given
    cy.visit('/login');
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 404,
    });

    //When
    cy.get('[data-cy="submit"]').should('be.disabled');
    cy.get('input[formControlName=email]').type('mail@fake.fr');
    cy.get('[data-cy="submit"]').should('be.disabled');
    cy.get('input[formControlName=password]').type('Aa123456!');
    cy.get('[data-cy="submit"]').should('be.enabled');
    cy.get('[data-cy="submit"]').click();

    //Then
    cy.url().should('include', '/login');
    cy.get('.error').should('exist');
  });
});
