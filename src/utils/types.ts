import { SerializedError } from '@reduxjs/toolkit';

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
};

export type TBun = TIngredient | null;

export type TConstructorIngredient = TIngredient & {
  id: string;
};

export type TConstructorState = {
  bun: TBun;
  ingredients: TConstructorIngredient[];
};

export type TFeed = {
  orders?: TOrder[];
  total: number;
  totalToday: number;
  isLoading?: boolean;
  error?: null | SerializedError;
};

export type TOrder = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};

export type TOrdersData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TUser = {
  email: string;
  name: string;
};

export type TTabMode = 'bun' | 'sauce' | 'main';

export type TIsModal = {
  isModal?: boolean;
};
