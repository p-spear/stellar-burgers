import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { selectFeedOrders, loadingFeeds } from '@selectors';
import { getFeeds } from '../../services/slices/feedsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectFeedOrders);
  const isLoading: boolean = useSelector(loadingFeeds);

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <FeedUI
          orders={orders}
          handleGetFeeds={() => {
            dispatch(getFeeds());
          }}
        />
      )}
    </>
  );
};
