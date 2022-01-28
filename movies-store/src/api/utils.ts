import fs from 'fs';

import { IUser, IToken } from '../interfaces';

//             users methods               //
export const getUsers = () => JSON.parse(fs.readFileSync('users.json', 'utf-8')) as IUser[];

export const updateUsersData = (users: IUser[]): void => {
  fs.writeFileSync('users.json', JSON.stringify(users));
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

// export const getUser = (id: IUser['id']): IUser => {
//   const users = getUsers();
//   const user = users.find((data) => data.id === id);
//   if (!user) {
//     throw new Error('No user found');
//   }
//   return user;
// };
