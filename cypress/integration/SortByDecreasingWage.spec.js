// Jordan's Cypress Test!

describe('Test Sort By Decreasing Wage button', () => {

    const jobs = require('./mynujob-394-default-rtdb-export.json');
    jobs.sort((j1, j2) => { return j2["PAY RATE"][0] - j1["PAY RATE"][0] });
    const highestPayingJob = jobs[0];
    const highestWage = highestPayingJob["PAY RATE"][0];

    it('launches', () => {
        cy.visit('/');
    });

    it('clicks the \"Sort By\" drop-down menu', () => {
        cy.visit('/');
        cy.get('[data-cy=sort-bar]').click();
    });

    it('selects the \"Decreasing Wage\" sort-option', () => {
        cy.visit('/');
        cy.get('[data-cy=sort-bar]').click();
        cy.get('[data-cy=decreasing-wage-button]').click();
    });

    it('successfully displays the highest-paying job at the top of the job list', () => {
        cy.visit('/');
        cy.get('[data-cy=sort-bar]').click();
        cy.get('[data-cy=decreasing-wage-button]').click();
        cy.get('[data-cy=job-0').should('contain', `${highestWage}`);
    });

});