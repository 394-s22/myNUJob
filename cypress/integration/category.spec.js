describe('Test App', () => {

    it('doesn not contain category', () => {
        cy.visit('/');
        cy.get('.filter').click({ multiple: true });
        cy.get('[data-cy=job]').should('contain', 'Administrative Aide');
    });

    it('doesn not contain category', () => {
        cy.visit('/');
        cy.get('.filter').click({ multiple: true });
        cy.get('[data-cy=job]').should('contain', 'Swimming Assistance');
    });
});