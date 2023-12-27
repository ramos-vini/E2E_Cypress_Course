/// <reference types="cypress" />

describe('navigation tests', () => {
  it('clicks "about " navigation link', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-cy="header-about-link"]').click();
  });
});