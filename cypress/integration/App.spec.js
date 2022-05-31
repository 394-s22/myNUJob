/* globals cy */

describe('Test App', () => {

  it('launches', () => {
    cy.visit('/');
  });

  it('opens with jobs', () => {
    cy.visit('/');
    cy.get('[data-cy=job]').should('contain', 'Administrative Aide');
  });

  it('shows modal', () => {
    cy.visit('/');
    cy.get('[data-cy=modal]').click();
    cy.get('[data-cy=jobInfo]').should('contain', 'JOB DESCRIPTION');
  });

});