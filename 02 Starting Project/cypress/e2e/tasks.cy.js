describe("tasks management", () => {
    it('clicks the "Add Task" button', () => {
        cy.visit('http://localhost:5173/');
        cy.get('button').contains('Add Task').click();
    });
    
    it('should open and close the new task modal', () => {
        cy.visit('http://localhost:5173/');
        cy.get('button').contains('Add Task').click();
        cy.get('.backdrop').click({force: true});
    });
}
)