// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom Command
Cypress.Commands.add('submitForm', () => { // Only recommended for highly repeated and complex commands
    cy.get('[data-cy="contact-btn-submit"]').click();
});

// Custom Query
Cypress.Commands.addQuery('getById', (id) => {

    // ready to execute function
    const getFn = cy.now('get', `[data-cy="${id}"]`); // cy.get('[data-cy="contact-input-message"]')

    return () => { // functions returned here work with the Timeframe model
        return getFn();
    }
})
