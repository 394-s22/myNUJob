describe ('Test App', () => {

    it ('doesn not contain category', () => {
        cy.visit ('/');
        cy.get('[data-cy=categoryClick]').click( {multiple: true});
        cy.get('[data-cy=job]').should('contain' ,'Administrative Aide');
    });

    it ('doesn not contain category', () => {
        cy.visit ('/');
        cy.get('[data-cy=categoryClick]').click( {multiple: true});
        cy.get('[data-cy=job]').should('contain' ,'Swimming Assistance');
    });
});