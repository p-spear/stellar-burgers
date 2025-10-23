import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { loadingOrders, selectUserOrders } from '@selectors';
import { getUserOrders } from '../../services/slices/ordersSlice';
import { getFeeds } from '../../services/slices/feedsSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const isloading = useSelector(loadingOrders);
  const orders: TOrder[] = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(getUserOrders());
    dispatch(getFeeds());
  }, []);

  if (isloading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
