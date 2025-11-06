import { describe, expect, test } from '@jest/globals';
import reducer, {
  registerUser,
  loginUser,
  updateUser,
  initialState,
  setIsAuthChecked,
  setUser,
  userLogout
} from './userSlice';

jest.mock('@api', () => ({
  getUserApi: jest.fn(),
  updateUserApi: jest.fn(),
  registerUserApi: jest.fn(),
  loginUserApi: jest.fn()
}));

const userMockData = {
  name: 'test',
  email: 'test@test.ru'
};

const registrationMockData = {
  name: 'test',
  email: 'test@test.ru',
  password: 'test'
};

const loginMockData = {
  name: 'test',
  email: 'test@test.ru',
  password: 'test'
};

describe('Проверяем редьюсер слайса userSlice', () => {
  describe('Проверяем регистрацию пользователя', () => {
    test('проверка состояния хранилища при pending', () => {
      const state = reducer(
        initialState,
        registerUser.pending('pending', registrationMockData)
      );
      expect(state.error).toBeNull();
    });

    test('проверка состояния хранилища при fulfilled', () => {
      const state = reducer(
        initialState,
        registerUser.fulfilled(userMockData, 'fulfilled', registrationMockData)
      );
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.userData).toEqual(userMockData);
    });

    test('проверка состояния хранилища при rejected', () => {
      const state = reducer(
        initialState,
        registerUser.rejected(
          new Error('Ошибка регистрации'),
          'rejected',
          registrationMockData
        )
      );
      expect(state.error).toEqual('Ошибка регистрации');
    });
  });

  describe('Проверяем вход пользователя', () => {
    test('проверка состояния хранилища при pending', () => {
      const state = reducer(
        initialState,
        loginUser.pending('pending', loginMockData)
      );
      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('проверка состояния хранилища при fulfilled', () => {
      const state = reducer(
        initialState,
        loginUser.fulfilled(userMockData, 'fulfilled', loginMockData)
      );
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.isAuthChecked).toBeTruthy();
      expect(state.userData).toEqual(userMockData);
    });

    test('проверка состояния хранилища при rejected', () => {
      const state = reducer(
        initialState,
        loginUser.rejected(new Error('Ошибка входа'), 'rejected', loginMockData)
      );
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toEqual('Ошибка входа');
    });
  });

  describe('Проверяем обновление данных пользователя', () => {
    test('проверка состояния хранилища при pending', () => {
      const state = reducer(
        initialState,
        updateUser.pending('pending', userMockData)
      );
      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('проверка состояния хранилища при fulfilled', () => {
      const state = reducer(
        initialState,
        updateUser.fulfilled(
          { success: true, user: userMockData },
          'fulfilled',
          userMockData
        )
      );
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.userData).toEqual(userMockData);
    });

    test('проверка состояния хранилища при rejected', () => {
      const state = reducer(
        initialState,
        updateUser.rejected(
          new Error('Ошибка обновления данных'),
          'rejected',
          loginMockData
        )
      );
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toEqual('Ошибка обновления данных');
    });
  });

  test('проверка проставления признака авторизации', () => {
    const state = reducer(initialState, setIsAuthChecked(true));
    expect(state.isAuthChecked).toBeTruthy();
  });

  test('проверка сохранения данных пользователя', () => {
    const state = reducer(initialState, setUser(userMockData));
    expect(state.userData).toEqual(userMockData);
  });

  test('проверка выхода пользователя', () => {
    const state = reducer(
      {
        userData: userMockData,
        isAuthChecked: true,
        isLoading: false,
        error: null
      },
      userLogout()
    );
    expect(state.userData).toEqual({
      name: '',
      email: ''
    });
  });
});
