/// <reference types="cypress" />

describe('main page', () => {
  it('has a title', () => {
    cy.visit('http://localhost:5173/');
    cy.get('h1').should('have.length', 1);
    cy.get('h1').contains('My Cypress Course Tasks');
  })

  it('has an image in the header', () => {
    cy.visit('http://localhost:5173/');
    cy.get('.main-header img'); // cy.get('.main-header').find('img');
  })
})