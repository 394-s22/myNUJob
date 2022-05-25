describe ('Test App', () => {
    it ('contain category', () => {
        cy.visit ('/');
        cy.get('[data-cy=categoryOptions]').should('contain', 'Administrative');
    });

    it ('doesn not contain category', () => {
        cy.visit ('/');
        cy.get('[data-cy=categoryOptions]').should('contain', 'Swim');
    });
});