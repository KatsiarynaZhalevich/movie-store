import { IUser, IFavorites } from '../interfaces';

export type UserAction = {
  type: string;
  value: IUser | null;
};

export type Favorite = {
  type: string;
  value: IFavorites;
};

export const authAction = (data: IUser | null): UserAction => ({ type: 'auth', value: data });

export const updateFavoriteItem = (value: IFavorites): Favorite => ({
  type: 'update',
  value: value,
});
