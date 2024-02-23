/// <reference types="Cypress" />

describe('takeaways', () => {
  beforeEach(() => {
    cy.task('seedDatabase');
  }
  );

  it('should display a list of fetched takeaways', () => {
    cy.visit('/');
    cy.get('[data-cy="takeaway-item"]').should('have.length', 2);
  });

  it('should create a takeaway', () => {
    cy.intercept('POST', 'takeaways/new*').as('postTakeaway');
    cy.login();
    cy.contains('Add a new takeaway').click();
    cy.location('pathname').should('eq','/takeaways/new');
    cy.get('[data-cy="title"]').click();
    cy.get('[data-cy="title"]').type('Title1');
    cy.get('[data-cy="body"]').type('Body1');
    cy.get('[data-cy="create-takeaway"]').click();
    cy.location('pathname').should('eq','/takeaways');
    // check via UI that the item was created
    cy.get('[data-cy="takeaway-item"]').should('have.length', 3);
    cy.get('[data-cy="takeaway-item"]:last-of-type h3').contains('Title1');
    cy.get('[data-cy="takeaway-item"]:last-of-type p').contains('Body1');
    //check what was sent in the request body
    cy.wait('@postTakeaway').then((interception) => {
      expect(interception.request.body).to.eq('title=Title1&body=Body1');
    });
  });
  
});