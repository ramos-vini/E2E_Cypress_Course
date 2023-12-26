/// <reference types="cypress" />

describe("tasks management", () => {
    it('clicks the "Add Task" button', () => {
        cy.visit('http://localhost:5173/');
        cy.get('button').contains('Add Task').click();
    });

    it('should open and close the new task modal', () => {
        cy.visit('http://localhost:5173/');

        cy.get('button').contains("Add Task").click();
        cy.get('.backdrop').click({ force: true });
        cy.get('.backdrop').should('not.exist');
        cy.get('dialog.modal').should('not.exist');

        cy.get('button').contains('Add Task').click();
        cy.get('button').contains('Cancel').click();
        cy.get('.backdrop').should('not.exist');
        cy.get('dialog.modal').should('not.exist');
    });

    it('should add a New Task', () => {
        cy.visit('http://localhost:5173/');

        cy.get('button').contains('Add Task').click();
        cy.get('#title').type("New Task");
        cy.get('#summary').type('Some Description');
        cy.get('.modal button').contains('Add Task').click();
        cy.get('.backdrop').should('not.exist');
        cy.get('dialog.modal').should('not.exist');
    });
    
}
)