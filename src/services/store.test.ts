import store, { rootReducer } from './store';
import { describe, expect, test } from '@jest/globals';

describe('Проверяем инициализацию rootReducer', () => {
  test('store содержит правильную структуру', () => {
    const state = store.getState();

    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('orders');
    expect(state).toHaveProperty('feeds');
    expect(state).toHaveProperty('user');
  });

  test('вызов редюсера с необъявленным экшеном не меняет состояние хранилища', () => {
    const state = store.getState();
    const newState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(newState).toEqual(state);
  });
});
