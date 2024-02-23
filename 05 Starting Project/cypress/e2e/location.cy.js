/// <reference types="cypress" />

describe('share location', () => {

  beforeEach(() => {
    cy.clock();

    cy.fixture('user-location.json').as('userLocation');

    cy.visit('/').then(win => {
      cy.get('@userLocation').then(fakePosition =>{
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').as('getUserPosition').callsFake(cb => {
          setTimeout(()=>{
            cb(fakePosition);
          }, 100);
         });
      });
      
      cy.stub(win.navigator.clipboard, 'writeText').as('saveToClipboard').resolves();
      cy.spy(win.localStorage, 'setItem').as('setLocation');
      cy.spy(win.localStorage, 'getItem').as('getLocation');
     });
  });

  it('should fetch the user location', () => {
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getUserPosition').should('have.been.called');
    cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
    cy.contains('Location fetched!');
  });

  it('should share a location URL', () => {
    const userName = 'Vini'
    cy.get('[data-cy="name-input"]').type(userName);
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('[data-cy="share-loc-btn"]').click();
    // "https://www.bing.com/maps?cp=37.5~48.01&lvl=15&style=r&sp=point.37.5_48.01_Vini"
    cy.get('@userLocation').then(fakeLocation => {
      const {latitude, longitude} = fakeLocation.coords;

      cy.get('@saveToClipboard')
      .should('have.been.calledWithMatch', new RegExp(`${latitude}.*${longitude}.*${encodeURI(userName)}`));

      cy.get('@setLocation')
      .should('have.been.calledWithMatch',
      `${userName}`,
      new RegExp(`${latitude}.*${longitude}.*${encodeURI(userName)}`));

      cy.get('[data-cy="share-loc-btn"]').click();
      cy.get('@getLocation').should('have.been.calledWithMatch',`${userName}`);
    });
    cy.get('[data-cy="info-message"]').should('be.visible');
    cy.tick(2000);
    cy.get('[data-cy="info-message"]').should('not.be.visible');

  });
});