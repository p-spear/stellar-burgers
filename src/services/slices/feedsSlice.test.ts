import { describe, expect, test } from '@jest/globals';
import reducer, { getFeeds, initialState } from './feedsSlice';

jest.mock('@api', () => ({
  getFeedsApi: jest.fn()
}));

const feedsMockData = [
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
  },
  {
    _id: '68f8fdf674993f001b5ba8a6',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa0947',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный фалленианский люминесцентный метеоритный бургер',
    createdAt: '2025-10-22T15:53:26.720Z',
    updatedAt: '2025-10-22T15:53:28.114Z',
    number: 91837
  }
];

const feedsResponseMockData = {
  success: true,
  orders: feedsMockData,
  total: 25,
  totalToday: 5
};

describe('Проверяем редьюсер слайса feedsSlice', () => {
  describe('Проверяем получение ленты заказов', () => {
    test('проверка состояния хранилища при pending', () => {
      const state = reducer(initialState, getFeeds.pending('pending'));
      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('проверка состояния хранилища при fulfilled', () => {
      const state = reducer(
        initialState,
        getFeeds.fulfilled(feedsResponseMockData, 'fulfilled')
      );
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.feedsData.orders).toEqual(feedsMockData);
      expect(state.feedsData.total).toEqual(feedsResponseMockData.total);
      expect(state.feedsData.totalToday).toEqual(
        feedsResponseMockData.totalToday
      );
    });

    test('проверка состояния хранилища при rejected', () => {
      const state = reducer(
        initialState,
        getFeeds.rejected(
          new Error('Ошибка получения ленты заказов'),
          'rejected'
        )
      );
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toEqual('Ошибка получения ленты заказов');
    });
  });
});
