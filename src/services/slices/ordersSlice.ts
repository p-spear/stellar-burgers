import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerApi, getOrderByNumberApi, getOrdersApi } from '@api';

interface IOrdersState {
  userOrders: TOrder[];
  orderModalData: TOrder | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IOrdersState = {
  userOrders: [],
  orderModalData: null,
  isLoading: false,
  error: null
};

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getOrder = createAsyncThunk(
  'orders/getOrder',
  async (number: number) => await getOrderByNumberApi(number)
);

export const getUserOrders = createAsyncThunk(
  'orders/getUserOrders',
  async () => await getOrdersApi()
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderModalData(state) {
      state.orderModalData = null;
    }
  },
  selectors: {
    selectOrderModalData: (state) => state.orderModalData,
    loadingOrders: (state) => state.isLoading,
    selectUserOrders: (state) => state.userOrders
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderModalData = action.payload.orders[0];
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
      });
  }
});

export const { clearOrderModalData } = ordersSlice.actions;

export default ordersSlice.reducer;
