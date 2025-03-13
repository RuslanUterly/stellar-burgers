import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TIsModal } from '@utils-types';
import { useDispatch, useSelector } from '@store';
import { useParams } from 'react-router-dom';
import {
  fetchOrder,
  selectIngredients,
  selectIngredientsIsLoading,
  selectIsOrderLoading,
  selectOrderModalData
} from '@slices';

export const OrderInfo: FC<TIsModal> = ({ isModal }) => {
  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>();

  useEffect(() => {
    dispatch(fetchOrder(Number(number)));
  }, [dispatch, number]);

  const isIngredientsLoading = useSelector(selectIngredientsIsLoading);
  const isOrderLoading = useSelector(selectIsOrderLoading);
  const orderData = useSelector(selectOrderModalData);
  const ingredients = useSelector(selectIngredients);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isIngredientsLoading || isOrderLoading) {
    return <Preloader />;
  }

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} isModal={isModal} />;
};
