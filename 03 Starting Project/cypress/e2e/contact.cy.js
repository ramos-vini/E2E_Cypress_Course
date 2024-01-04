/// <reference types="cypress" />

describe('form submition', () => {
    it('should submit the form', () => {
      cy.visit('http://localhost:5173/about');
      cy.get('[data-cy="contact-input-message"]').type('I am your father');
      cy.get('[data-cy="contact-input-name"]').type('Darth Vader');
      cy.get('[data-cy="contact-input-email"]').type('darthvader@email.com');
      cy.get('[data-cy="contact-btn-submit"]').as('submitBtn').then((elem) => { // alias + then() function
        expect(elem.attr('disabled')).to.be.undefined; // cy.get('@submitBtn').should('not.have.attr', 'disabled');
        expect(elem.text()).to.eq('Send Message');
      })
      cy.get('@submitBtn').click(); 
      cy.get('@submitBtn').contains('Sending...');
      cy.get('@submitBtn').should('have.attr', 'disabled');
      cy.get('@submitBtn').should('not.have.attr', 'disabled');
    });

    it('should submit the form when pressing enter', () => {
      cy.visit('http://localhost:5173/about');
      cy.get('[data-cy="contact-input-message"]').type('I am your father');
      cy.get('[data-cy="contact-input-name"]').type('Darth Vader');
      cy.get('[data-cy="contact-input-email"]').type('darthvader@email.com{enter}');
      cy.get('[data-cy="contact-btn-submit"]').as('submitBtn').then((elem) => {
        expect(elem.text()).to.eq('Sending...');
        expect(elem.attr('disabled')).to.exist;
      });
    });
  });