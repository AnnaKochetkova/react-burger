/// <reference types="cypress" />
describe('click on button create order', () => {
    before(function() {
        cy.visit('http://localhost:3000');
    });

    it('should open order page after click button order', function() {
        const elem = cy.get('[data-cy="ingredient"]').first()
        elem.click() //{ multiple: true }
        cy.contains('Детали ингредиента');

        cy.get('[data-cy-close="close"]').click();
    });
})