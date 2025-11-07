/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Mock ingredients API response
     * @example cy.mockIngredients()
     */
    mockIngredients(): Chainable<void>
    
    /**
     * Mock user API response
     * @example cy.mockUser()
     */
    mockUser(): Chainable<void>
    
    /**
     * Mock order API response
     * @example cy.mockOrder()
     */
    mockOrder(): Chainable<void>
  }
}
