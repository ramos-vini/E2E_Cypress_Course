describe('newsletter', () => {
    beforeEach(() => {
        cy.task('seedDatabase');
    });

    it('shoul submit an email to the newsletter', () => {
        cy.intercept('POST', '/newsletter*', { status: 201 }).as('postNewsletter');
        cy.visit('/');
        cy.get('[data-cy="newsletter-email"]').type('myowntest@example.com');
        cy.get('[data-cy="newsletter-submit"]').click();
        cy.wait('@postNewsletter');
        cy.contains('Thanks for signing up!');
    });

    it('should return an error message for an existing email', () => {
        cy.intercept('POST', '/newsletter*', { message: 'This email already exists.' }).as('failedToSubscribeEmail');
        cy.visit('/');
        cy.get('[data-cy="newsletter-email"]').type('myowntest@example.com');
        cy.get('[data-cy="newsletter-submit"]').click();
        cy.wait('@failedToSubscribeEmail');
        cy.contains('This email already exists.');
    });

    it('should add an email to the database', () => {
        cy.request({
            method: 'POST',
            url: 'newsletter',
            body: {
                email: 'myowntest@example.com'
            },
            form: true
        }
        ).then(res => {
            expect(res.status).to.eq(201);
        });
    });

});
