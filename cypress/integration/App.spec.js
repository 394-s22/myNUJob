/* globals cy */
    
describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/');
    });

    it ('opens with jobs', () => {
        cy.visit ('/');
        cy.get('[data-cy=job]').should('contain', 'Fall CS');
      });
  
  });