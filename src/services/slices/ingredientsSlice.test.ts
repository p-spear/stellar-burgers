import {
  describe,
  expect,
  test,
  jest,
  beforeAll,
  afterAll
} from '@jest/globals';
import reducer, { getIngredients, initialState } from './ingredientsSlice';

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn()
}));

const mockIngredients = [
  {
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
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  },
  {
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
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0947',
    name: 'Плоды Фалленианского дерева',
    type: 'main',
    proteins: 20,
    fat: 5,
    carbohydrates: 55,
    calories: 77,
    price: 874,
    image: 'https://code.s3.yandex.net/react/code/sp_1.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png'
  }
];

describe('Проверяем редьюсер слайса ingredientsSlice', () => {
  test('проверка состояния хранилища при pending', () => {
    const state = reducer(initialState, getIngredients.pending('pending'));
    expect(state.isLoading).toBeTruthy();
    expect(state.error).toBeNull();
  });

  test('проверка состояния хранилища при fulfilled', () => {
    const state = reducer(
      initialState,
      getIngredients.fulfilled(mockIngredients, 'fulfilled')
    );
    expect(state.isLoading).toBeFalsy();
    expect(state.error).toBeNull();
    expect(state.ingredients).toEqual(mockIngredients);
  });

  test('проверка состояния хранилища при rejected', () => {
    const state = reducer(
      initialState,
      getIngredients.rejected(new Error('Ошибка загрузки'), 'rejected')
    );
    expect(state.isLoading).toBeFalsy();
    expect(state.error).toEqual('Ошибка загрузки');
  });
});
