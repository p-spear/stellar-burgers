import {
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface IConstructorState {
  ingredients: TConstructorIngredient[];
  bun: TIngredient | null;
}

const initialState: IConstructorState = {
  ingredients: [],
  bun: null
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.ingredients.push({ ...action.payload, id: nanoid() });
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient(
      state,
      action: PayloadAction<{
        index: number;
        direction: 'up' | 'down';
      }>
    ) {
      const ingredientsArray = state.ingredients;
      const ingredientIndex = action.payload.index;
      if (action.payload.direction === 'down') {
        [
          ingredientsArray[ingredientIndex],
          ingredientsArray[ingredientIndex + 1]
        ] = [
          ingredientsArray[ingredientIndex + 1],
          ingredientsArray[ingredientIndex]
        ];
      } else {
        [
          ingredientsArray[ingredientIndex - 1],
          ingredientsArray[ingredientIndex]
        ] = [
          ingredientsArray[ingredientIndex],
          ingredientsArray[ingredientIndex - 1]
        ];
      }
      state.ingredients = ingredientsArray;
    },
    clearConstructor(state) {
      state.ingredients = [];
      state.bun = null;
    }
  },
  selectors: {
    selectBurgerIngredients: (state) => state
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
