describe('authentication', () => {
    beforeEach(() => {
        cy.task('seedDatabase');
    });

    it('should sign up', () => {
        cy.visit('/signup');
        cy.get('[data-cy="auth-email"]').click();
        cy.get('[data-cy="auth-email"]').type('myowntest@example.com');
        cy.get('[data-cy="auth-password"]').type('myowntestpassword');
        cy.get('[data-cy="auth-submit"]').click();
        cy.location('pathname').should('eq', '/takeaways');
        cy.getCookie('__session').its('value').should('not.be.empty');
    });

    it('should login', () => {
        cy.login();
    });

    it('should log out', () => {
        cy.login();
        cy.contains('Logout').click();
        cy.location('pathname').should('eq', '/');
        cy.getCookie('__session').its('value').should('be.empty');
    });
    
});
