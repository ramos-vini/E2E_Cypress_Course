/// <reference types="cypress" />

describe('main page tests', () => {
  it('contains 6 info boxes', () => {
    cy.visit('http://localhost:5173/');
    cy.get('li').should('have.length', 6)
  })
})