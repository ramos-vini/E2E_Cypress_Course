/// <reference types="cypress" />

describe('form submition', () => {
    it('should submit the form', () => {
      cy.visit('http://localhost:5173/about');
      cy.get('[data-cy="contact-input-message"]').type('I am your father');
      cy.get('[data-cy="contact-input-name"]').type('Darth Vader');
      cy.get('[data-cy="contact-input-email"]').type('darthvader@email.com');
      cy.get('[data-cy="contact-btn-submit"]').click();
      cy.get('[data-cy="contact-btn-submit"]').contains('Sending...');
      cy.get('[data-cy="contact-btn-submit"]').should('have.attr', 'disabled');
      cy.get('[data-cy="contact-btn-submit"]').should('not.have.attr', 'disabled');
    });
  });