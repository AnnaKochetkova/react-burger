import '@4tw/cypress-drag-drop'
describe("Drag and Drop", () => {
 
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        /* @ts-ignore */
        cy.login('anyakochetkova99@mail.ru', 'Q1w2e3r4')
        cy.contains('Конструктор').click();
    });
    
    it('should drag fried ingredients to the order', () => {
      const dataTransfer = new DataTransfer();
   
      cy.get('[data-cy="ingredient"]').first().trigger('dragstart', {
        dataTransfer
      });
   
      cy.get('[data-cy="bun"]').trigger('drop', {
        dataTransfer
      });


      cy.get('[data-cy="ingredient"]').eq(5).trigger('dragstart', {
        dataTransfer
      });
   
      cy.get('[data-cy="ingredientconstructor"]').trigger('drop', {
        dataTransfer
      });

      cy.get('[data-cy="ingredient"]').eq(8).trigger('dragstart', {
        dataTransfer
      });
   
      cy.get('[data-cy="ingredientconstructor"]').trigger('drop', {
        dataTransfer
      });

      cy.contains('Оформить заказ').click();
      cy.location('pathname').should('eq', '/react-burger/order')
      cy.contains('идентификатор заказа', {timeout: 25000});

      cy.get('[data-cy-close="close"]').click();
      cy.contains('Соберите бургер')
    });

});