import { IUser } from './../interfaces';
import express, { Request, Response } from 'express';
import CORS from 'cors';

import {
  addFavoriteItem,
  createToken,
  deleteFavoriteItem,
  deleteToken,
  // getUser,
  getUserByToken,
  getUsers,
  saveUser,
  updateUsersData,
} from './utils';

const port = 8081;
const app = express();

// eslint-disable-next-line new-cap
app.use(CORS());
app.listen(port, () => {
  console.log('server run');
});
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post('/api/auth/signIn', (req: Request, res: Response) => {
  const users = getUsers();
  const user = users.find(
    (data) => data.username === req.body.username && data.password === req.body.password
  );
  if (user) {
    const token = createToken(user.id);
    res.send(JSON.stringify({ user, token }));
  } else res.sendStatus(400);
});

app.post('/api/auth/signUp', (req: Request, res: Response) => {
  const users = getUsers();
  const candidate = users.find((item) => item.username === req.body.username);

  if (!candidate) {
    const { id } = users[users.length - 1];
    const newUser: IUser = req.body;
    newUser.id = id + 1;
    newUser.favorites = {
      movie: [],
      tvShow: [],
    };
    const token = createToken(newUser.id);
    res.send({ newUser, token });
    users.push(newUser);
    updateUsersData(users);
  } else res.sendStatus(400);
});

app.post('/api/auth/signOut', (req: Request, res: Response) => {
  if (req.body.token) {
    deleteToken(req.body.token);
    res.sendStatus(200);
    return;
  }
  res.sendStatus(400);
});

app.post('/api/auth/getUser', (req: Request, res: Response) => {
  const user = getUserByToken(req.body.token);
  res.send(user);
});

app.post('/api/addToFavorites', (req: Request, res: Response) => {
  const updatedUser = addFavoriteItem(req.body.userId, +req.body.id, req.body.mediaType);
  saveUser(updatedUser);
  res.send(updatedUser.favorites);
});

app.post('/api/deleteFromFavorites', (req: Request, res: Response) => {
  const updatedUser = deleteFavoriteItem(req.body.userId, +req.body.id, req.body.mediaType);
  saveUser(updatedUser);
  res.send(updatedUser.favorites);
});

app.post('/api/updateProfileData', (req: Request, res: Response) => {
  const users = getUsers();
  const editedData = users.map((user: IUser) => {
    if (user.id === req.body.id) {
      const isAvailable = users.find((item) => item.username === req.body.username);

      if (!isAvailable || (isAvailable && user.username === req.body.username)) {
        if (req.body.phone !== '') {
          user.phone = req.body.phone;
        }
        if (req.body.username !== '') {
          user.username = req.body.username;
        }
        res.send(user);
      } else {
        res.sendStatus(400);
      }
    }
    return user;
  });
  updateUsersData(editedData);
});

app.post('/api/changePassword', (req: Request, res: Response) => {
  const users = getUsers();
  console.log(req.body.id);
  const editedData = users.map((user: IUser) => {
    if (user.id === req.body.id) {
      if (user.password === req.body.password) {
        user.password = req.body.newPassword;
        updateUsersData(users);
        res.sendStatus(200);
      }
    } else {
      res.sendStatus(400);
    }
    return user;
  });
  updateUsersData(editedData);
});
