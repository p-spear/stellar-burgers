/// <reference types="cypress" />

const elementsData = {
  bun: '[data-cy="Краторная булка N-200i"]',
  main: '[data-cy="Биокотлета из марсианской Магнолии"]',
  sauce: '[data-cy="Соус Spicy-X"]',
  constructorBunTop: '[data-cy="constructor-bun-top"]',
  constructorBunBottom: '[data-cy="constructor-bun-bottom"]',
  constructorIngredients: '[data-cy="constructor-ingredients"]',
  modal: '[data-cy="modal"]',
  modalCloseButton: '[data-cy="modal-close-btn"]',
  modalOverlay: '[data-cy="modal-overlay"]',
  orderButton: '[data-cy="order-btn"]',
}

describe('Интеграционное тестирование приложения бургерной', () => {
  
  beforeEach(() => {
    cy.setCookie('accessToken', 'accessToken');
    window.localStorage.setItem('refreshToken', 'refreshToken');
    
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    cy.clearCookies();
  });
  
  describe('Проверка конструктора бургера', () => {
    it('Добавление булки', () => {
      cy.get(elementsData.constructorBunTop).should('not.exist');
      cy.get(elementsData.constructorBunBottom).should('not.exist');
      
      cy.get(elementsData.bun).find('button').contains('Добавить').click();
      
      cy.get(elementsData.constructorBunTop).contains('Краторная булка N-200i');
      cy.get(elementsData.constructorBunBottom).contains('Краторная булка N-200i');
    });

    it('Добавление начинки', () => {
      cy.get(elementsData.constructorIngredients).should('not.exist');

      cy.get(elementsData.main).find('button').contains('Добавить').click();
      cy.get(elementsData.constructorIngredients).contains('Биокотлета из марсианской Магнолии');
    });

    it('Добавление соуса', () => {
      cy.get(elementsData.constructorIngredients).should('not.exist');

      cy.get(elementsData.sauce).find('button').contains('Добавить').click();
      cy.get(elementsData.constructorIngredients).contains('Соус Spicy-X');
    });
  });

  describe('Проверка работы модальных окон', () => {
    it('Открытие модального окна ингредиента', () => {
      cy.get(elementsData.main).contains('Биокотлета из марсианской Магнолии').click();
      cy.get(elementsData.modal).contains('Биокотлета из марсианской Магнолии').should('be.visible');
    });

    it('Закрытие модального окна ингредиента при клике на кнопку', () => {
      cy.get(elementsData.sauce).contains('Соус Spicy-X').click();
      cy.get(elementsData.modal).should('be.visible');

      cy.get(elementsData.modalCloseButton).click();
      cy.get(elementsData.modal).should('not.exist');
    });

    it('Закрытие модального окна ингредиента при клике на оверлей', () => {
      cy.get(elementsData.bun).contains('Краторная булка N-200i').click();
      cy.get(elementsData.modal).should('be.visible');

      cy.get(elementsData.modalOverlay).click({ force: true });
      cy.get(elementsData.modal).should('not.exist');
    });
  });

  describe('Проверка оформления заказа', () => {
    it('Создание бургера, оформление заказа, получение ответа и очищение конструктора', () => {
      cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('createOrder');
      cy.wait('@getUser');
      
      cy.get(elementsData.bun).find('button').contains('Добавить').click();
      cy.get(elementsData.main).find('button').contains('Добавить').click();
      cy.get(elementsData.sauce).find('button').contains('Добавить').click();

      cy.get(elementsData.constructorBunTop).should('exist');
      cy.get(elementsData.constructorBunBottom).should('exist');
      cy.get(elementsData.constructorIngredients).should('exist');

      cy.get(elementsData.orderButton).find('button').contains('Оформить заказ').click();

      cy.wait('@createOrder');

      cy.get(elementsData.modal).contains('93439').should('be.visible');

      cy.get(elementsData.modalCloseButton).click();
      cy.get(elementsData.modal).should('not.exist');

      cy.get(elementsData.constructorBunTop).should('not.exist');
      cy.get(elementsData.constructorBunBottom).should('not.exist');
      cy.get(elementsData.constructorIngredients).contains('Выберите начинку');
    });
  });
});
