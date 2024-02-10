describe('Me spec', () => {
  it('I can access my data', () => {
    //Given
    cy.login('The Old Man', 'ROLE_USER');

    //When
    cy.get('span').contains('Mon compte').should('exist');
    cy.get('span').contains('Mon compte').click();

    //Then
    cy.url().should('include', '/main/me');
    cy.get('input[formControlName=email]').should(
      'have.value',
      'test@test.com'
    );
    cy.get('input[formControlName=name]').should('have.value', 'The Old Man');
    cy.get('input[formControlName=password]').should('be.empty');
    cy.get('input[formControlName=password2]').should('be.empty');
    cy.get('input[formControlName=oldPassword]').should('be.empty');
    cy.get('[data-cy="submit"]').should('be.disabled');
  });

  it('I can navigate from Me to main', () => {
    //Given
    cy.login('The Old Man', 'ROLE_USER');
    cy.get('span').contains('Mon compte').should('exist');
    cy.get('span').contains('Mon compte').click();
    cy.url().should('include', '/main/me');

    //When
    cy.get('[data-cy="back"]').should('exist');
    cy.get('[data-cy="back"]').click();

    //Then
    cy.url().should('not.include', 'me');
  });

  it('I can disconnect from Me', () => {
    //Given
    cy.login('The Old Man', 'ROLE_USER');
    cy.get('span').contains('Mon compte').should('exist');
    cy.get('span').contains('Mon compte').click();
    cy.url().should('include', '/main/me');

    //When
    cy.get('div').contains('déconnecter').should('exist');
    cy.get('div').contains('déconnecter').click();

    //Then
    cy.url().should('not.include', 'me');
    cy.url().should('not.include', 'main');
  });

  it('When I try to change my data with valid infos, all is OK', () => {
    //Given
    cy.login('The Old Man', 'ROLE_USER');
    cy.get('span').contains('Mon compte').should('exist');
    cy.get('span').contains('Mon compte').click();
    cy.url().should('include', '/main/me');

    cy.intercept('PUT', '/api/auth/me', {
      body: {
        token: 'qsdfghjklm',
      },
    });
    cy.intercept(
      {
        method: 'GET',
        url: '/api/auth/me',
      },
      {
        id: 42,
        name: 'The Old Man',
        email: 'test@test.com',
        roles: 'ROLE_USER',
      }
    ).as('user');

    //When
    cy.get('input[formControlName=password]').type('Zz987654!');
    cy.get('[data-cy="submit"]').should('be.disabled');
    cy.get('input[formControlName=password2]').type('Zz987654!');
    cy.get('[data-cy="submit"]').should('be.disabled');
    cy.get('input[formControlName=oldPassword]').type('Aa123456');
    cy.get('[data-cy="submit"]').should('be.enabled');
    cy.get('[data-cy="submit"]').click();

    //Then
    cy.url().should('include', 'main');
    cy.url().should('not.include', 'me');
  });

  it('When I try to change my data with invalid infos, I get an arror message', () => {
    //Given
    cy.login('The Old Man', 'ROLE_USER');
    cy.get('span').contains('Mon compte').should('exist');
    cy.get('span').contains('Mon compte').click();
    cy.url().should('include', '/main/me');

    cy.intercept('PUT', '/api/auth/me', {
      statusCode: 400,
    });
    cy.intercept(
      {
        method: 'GET',
        url: '/api/auth/me',
      },
      {
        id: 42,
        name: 'The Old Man',
        email: 'test@test.com',
        roles: 'ROLE_USER',
      }
    ).as('user');

    //When
    cy.get('input[formControlName=oldPassword]').type('Aa123456');
    cy.get('[data-cy="submit"]').should('be.enabled');
    cy.get('input[formControlName=name]').type('Ishta');
    cy.get('[data-cy="submit"]').click();

    //Then
    cy.url().should('include', 'main/me');
    cy.get('.error').should('exist');
  });
});
