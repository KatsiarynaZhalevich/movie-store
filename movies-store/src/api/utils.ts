import fs from 'fs';

import { IUser, IToken } from '../interfaces';

//             users methods               //
export const getUsers = () => JSON.parse(fs.readFileSync('users.json', 'utf-8')) as IUser[];

export const updateUsersData = (users: IUser[]): void => {
  fs.writeFileSync('users.json', JSON.stringify(users));
};

export const getUserByToken = (token: number): IUser | undefined => {
  const tokens = getTokens();
  const users = getUsers();
  const item = tokens.find((data) => data.token === token);

  if (!item) {
    throw new Error('unauthorized user');
  }
  return users.find((data) => data.id === item.userId);
};

export const getUser = (id: IUser['id']): IUser => {
  const users = getUsers();
  const user = users.find((data) => data.id === id);
  if (!user) {
    throw new Error('No user found');
  }
  return user;
};

export const saveUser = (user: IUser): void => {
  const users = getUsers();
  const updatedUsers = users.map((data) => (data.id !== user.id ? data : user));
  fs.writeFileSync('users.json', JSON.stringify(updatedUsers));
};

//             end users methods               //

//             token methods               //
export const getTokens = (): IToken[] => JSON.parse(fs.readFileSync('token.json', 'utf-8'));

export const createToken = (userId: number) => {
  const newToken = Math.floor(Math.random() * 101);
  const tokens = getTokens();
  const isToken = tokens.find((data) => data.token === newToken);
  if (isToken) {
    createToken(userId);
  } else {
    saveToken(userId, newToken);
    return newToken;
  }
};

export const saveToken = (userId: number, token: number): void => {
  const data = { token, userId };
  const tokens = getTokens();
  const newData = [...tokens, data];
  fs.writeFileSync('token.json', JSON.stringify(newData));
};
export const deleteToken = (token: string): void => {
  const tokens = getTokens();
  const tokenInt = parseInt(token, 10);
  const updatedTokens = tokens.filter((data) => data.token !== tokenInt);
  fs.writeFileSync('token.json', JSON.stringify(updatedTokens));
};

//             end token methods               //

//             favorites methods               //

export const addFavoriteItem = (userId: IUser['id'], id: number, type: string) => {
  const users = getUsers();
  let updatedUser!: IUser;

  const updatedUsers: IUser[] = users.map((user: IUser) => {
    if (user.id === userId) {
      type === 'movie' ? user.favorites.movie.push(id) : user.favorites.tvShow?.push(id);
      updatedUser = user;
    }
    return user;
  });
  if (!updatedUser) {
    throw new Error('No user found');
  }
  updateUsersData(updatedUsers);
  return updatedUser;
};

export const deleteFavoriteItem = (userId: IUser['id'], id: number, type: string) => {
  const users = getUsers();

  let updatedUser!: IUser;
  const updatedUsers: IUser[] = users.map((user: IUser) => {
    if (user.id === userId) {
      type === 'movie'
        ? (user.favorites.movie = user.favorites.movie.filter((movie: number) => movie !== id))
        : (user.favorites.tvShow = user.favorites.tvShow.filter((tvShow: number) => tvShow !== id));
      updatedUser = user;
    }
    return user;
  });
  if (!updatedUser) {
    throw new Error('No user found');
  }
  updateUsersData(updatedUsers);
  return updatedUser;
};
//             end favorites methods               //
