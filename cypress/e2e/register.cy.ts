describe('Register spec', () => {
  it('user can register with correct credentials', () => {
    //Given
    cy.visit('/register');
    cy.intercept('POST', '/api/auth/register', {
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
        id: 42,
        name: 'Gertrude',
        email: 'gertrude@test.com',
        roles: 'ROLE_USER',
      }
    ).as('user');

    //When
    cy.get('[data-cy="submit"]').should('be.disabled');
    cy.get('input[formControlName=email]').type('gertrude@test.com');
    cy.get('[data-cy="submit"]').should('be.disabled');
    cy.get('input[formControlName=name]').type('Gertrude');
    cy.get('[data-cy="submit"]').should('be.disabled');
    cy.get('input[formControlName=password]').type('A123456789');
    cy.get('input[formControlName=password2]').type('A123456789');
    cy.get('[data-cy="submit"]').should('be.disabled');
    cy.get('input[formControlName=password]').clear();
    cy.get('input[formControlName=password]').type('Aa123456');
    cy.get('[data-cy="submit"]').should('be.disabled');
    cy.get('input[formControlName=password2]').clear();
    cy.get('input[formControlName=password2]').type('Aa123456');
    cy.get('[data-cy="submit"]').should('be.enabled');
    cy.get('[data-cy="submit"]').click();

    //Then
    cy.url().should('include', '/main');
    cy.get('.admin').should('not.exist');
  });

  it('user cant register with already used credentials', () => {
    //Given
    cy.visit('/register');
    cy.intercept('POST', '/api/auth/register', {
      statusCode: 400,
    });

    //When
    cy.get('input[formControlName=email]').type('gertrude@test.com');
    cy.get('input[formControlName=name]').type('Gertrude');
    cy.get('input[formControlName=password]').type('Aa123456');
    cy.get('input[formControlName=password2]').type('Aa123456');
    cy.get('[data-cy="submit"]').click();

    //Then
    cy.url().should('include', '/register');
    cy.get('.error').should('exist');
  });
});
