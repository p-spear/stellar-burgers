export {};

declare global {
  namespace Cypress {
    interface Chainable {
      mockIngredients(): Chainable<void>;
      mockUser(): Chainable<void>;
      mockOrder(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('mockIngredients', () => {
  cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
});

Cypress.Commands.add('mockUser', () => {
  cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');
});

Cypress.Commands.add('mockOrder', () => {
  cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('createOrder');
});
