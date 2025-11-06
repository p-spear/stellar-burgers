import { describe, expect, test } from '@jest/globals';
import reducer, {
  createOrder,
  getOrder,
  getUserOrders,
  initialState,
  clearOrderModalData
} from './ordersSlice';

jest.mock('@api', () => ({
  orderBurgerApi: jest.fn(),
  getOrdersApi: jest.fn(),
  getOrderByNumberApi: jest.fn()
}));

const orderMockData = [
  {
    _id: '690b36aaa64177001b31d0ee',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2025-11-05T11:36:10.543Z',
    updatedAt: '2025-11-05T11:36:10.758Z',
    number: 93347
  }
];

describe('Проверяем редьюсер слайса ordersSlice', () => {
  describe('Проверяем получение заказов', () => {
    test('проверка состояния хранилища при pending', () => {
      const state = reducer(initialState, getUserOrders.pending('pending'));
      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('проверка состояния хранилища при fulfilled', () => {
      const state = reducer(
        initialState,
        getUserOrders.fulfilled(orderMockData, 'fulfilled')
      );
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.userOrders).toEqual(orderMockData);
    });

    test('проверка состояния хранилища при rejected', () => {
      const state = reducer(
        initialState,
        getUserOrders.rejected(
          new Error('Ошибка получения заказов'),
          'rejected'
        )
      );
      expect(state.error).toEqual('Ошибка получения заказов');
    });
  });

  describe('Проверяем получение заказа', () => {
    test('проверка состояния хранилища при pending', () => {
      const state = reducer(
        initialState,
        getOrder.pending('pending', orderMockData[0].number)
      );
      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('проверка состояния хранилища при fulfilled', () => {
      const state = reducer(
        initialState,
        getOrder.fulfilled(
          { success: true, orders: orderMockData },
          'fulfilled',
          orderMockData[0].number
        )
      );
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.orderModalData).toEqual(orderMockData[0]);
    });

    test('проверка состояния хранилища при rejected', () => {
      const state = reducer(
        initialState,
        getOrder.rejected(
          new Error('Ошибка получения заказа'),
          'rejected',
          orderMockData[0].number
        )
      );
      expect(state.error).toEqual('Ошибка получения заказа');
    });
  });

  describe('Проверяем создание заказа', () => {
    test('проверка состояния хранилища при pending', () => {
      const state = reducer(
        initialState,
        createOrder.pending('pending', orderMockData[0].ingredients)
      );
      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('проверка состояния хранилища при fulfilled', () => {
      const state = reducer(
        initialState,
        createOrder.fulfilled(
          {
            success: true,
            name: 'Био-марсианский люминесцентный краторный бургер',
            order: orderMockData[0]
          },
          'fulfilled',
          orderMockData[0].ingredients
        )
      );
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.orderModalData).toEqual(orderMockData[0]);
    });

    test('проверка состояния хранилища при rejected', () => {
      const state = reducer(
        initialState,
        createOrder.rejected(
          new Error('Ошибка создания заказа'),
          'rejected',
          []
        )
      );
      expect(state.error).toEqual('Ошибка создания заказа');
    });
  });

  test('проверка очищения данных для модального окна', () => {
    const state = reducer(
      {
        userOrders: orderMockData,
        orderModalData: orderMockData[0],
        isLoading: false,
        error: null
      },
      clearOrderModalData()
    );
    expect(state.orderModalData).toBeNull();
    expect(state.userOrders).toEqual(orderMockData);
  });
});
