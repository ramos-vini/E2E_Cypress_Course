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
        cy.get('.task h2').contains('New Task');
        cy.get('.task p').contains('Some Description');
    });

    it('should validate user input', () => {
        cy.visit('http://localhost:5173/');

        cy.get('button').contains('Add Task').click();
        cy.get('.modal button').contains('Add Task').click();
        cy.get('.modal .error-message');
    });
    
    it('should filter tasks', () => {
        cy.visit('http://localhost:5173/');

        cy.get('button').contains('Add Task').click();
        cy.get('#title').type("New Task");
        cy.get('#summary').type('Some Description');
        cy.get('#category').select('urgent');
        cy.get('.modal button').contains('Add Task').click();
        cy.get('.task').should('have.length', 1);

        cy.get('#filter').select('moderate');
        cy.get('.task').should('have.length', 0);

        cy.get('#filter').select('urgent');
        cy.get('.task').should('have.length', 1);
    });

    it('should add multiple tasks', () => {
        cy.visit('http://localhost:5173/');

        cy.get('button').contains('Add Task').click();
        cy.get('#title').type("Task 1");
        cy.get('#summary').type('First Task');
        cy.get('.modal button').contains('Add Task').click();
        cy.get('.task').should('have.length', 1);

        cy.get('button').contains('Add Task').click();
        cy.get('#title').type("Task 2");
        cy.get('#summary').type('Second Task');
        cy.get('.modal button').contains('Add Task').click();
        cy.get('.task').should('have.length', 2);

        cy.get('.task').eq(0).find('h2').contains('Task 1'); // first()
        cy.get('.task').eq(1).find('h2').contains('Task 2'); // last()
    });
    
    
}
)