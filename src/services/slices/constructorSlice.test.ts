import { describe, expect, test } from '@jest/globals';
import reducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  initialState,
  clearConstructor
} from './constructorSlice';

const mockBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const mockIngredient1 = {
  id: '643d69a5c3f7b9001cfa093f',
  _id: '643d69a5c3f7b9001cfa093f',
  name: 'Мясо бессмертных моллюсков Protostomia',
  type: 'main',
  proteins: 433,
  fat: 244,
  carbohydrates: 33,
  calories: 420,
  price: 1337,
  image: 'https://code.s3.yandex.net/react/code/meat-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
  __v: 0
};

const mockIngredient2 = {
  id: '643d69a5c3f7b9001cfa0940',
  _id: '643d69a5c3f7b9001cfa0940',
  name: 'Говяжий метеорит (отбивная)',
  type: 'main',
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: 'https://code.s3.yandex.net/react/code/meat-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
  __v: 0
};

const mockIngredient3 = {
  id: '643d69a5c3f7b9001cfa093d',
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
  __v: 0
};

describe('Проверяем редьюсер слайса constructorSlice', () => {
  test('добавление булки', () => {
    const state = reducer(initialState, addBun(mockBun));
    expect(state.bun).toEqual(mockBun);
  });

  test('добавление ингредиента', () => {
    const state = reducer(initialState, addIngredient(mockIngredient1));

    expect(state.ingredients).toHaveLength(1);

    const addedIngredient = state.ingredients[0];
    expect(addedIngredient).toMatchObject({
      ...mockIngredient1,
      id: expect.any(String)
    });
  });

  test('удаление ингредиента', () => {
    const state = reducer(initialState, addIngredient(mockIngredient1));
    expect(state.ingredients).toHaveLength(1);

    const ingredientId = state.ingredients[0].id;

    const newState = reducer(state, removeIngredient(ingredientId));
    expect(newState.ingredients).toEqual([]);
  });

  test('перемещение ингредиента', () => {
    const state = {
      bun: null,
      ingredients: [mockIngredient1, mockIngredient2, mockIngredient3]
    };

    const upIngredientState = reducer(
      state,
      moveIngredient({ index: 1, direction: 'up' })
    );
    expect(upIngredientState.ingredients).toEqual([
      mockIngredient2,
      mockIngredient1,
      mockIngredient3
    ]);

    const downIngredientState = reducer(
      upIngredientState,
      moveIngredient({ index: 1, direction: 'down' })
    );
    expect(downIngredientState.ingredients).toEqual([
      mockIngredient2,
      mockIngredient3,
      mockIngredient1
    ]);
  });

  test('очистка конструктора', () => {
    const state = {
      bun: null,
      ingredients: [mockIngredient1, mockIngredient2, mockIngredient3]
    };

    const newState = reducer(state, clearConstructor());
    expect(newState.ingredients).toEqual([]);
  });
});
