import { ingredientsSlice } from '../slices/ingredientsSlice';
import { constructorSlice } from '../slices/constructorSlice';
import { ordersSlice } from '../slices/ordersSlice';
import { feedsSlice } from '../slices/feedsSlice';
import { userSlice } from '../slices/userSlice';

export const { selectAllIngredients, loadingIngredients } =
  ingredientsSlice.selectors;
export const { selectBurgerIngredients } = constructorSlice.selectors;
export const { selectOrderModalData, loadingOrders, selectUserOrders } =
  ordersSlice.selectors;
export const { selectFeedsData, selectFeedOrders, loadingFeeds } =
  feedsSlice.selectors;
export const {
  selectUser,
  selectIsAuthChecked,
  selectUserDataError,
  selectLoading
} = userSlice.selectors;
