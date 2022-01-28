import express, { Request, Response } from 'express';
import CORS from 'cors';
import { IUser } from '../interfaces';
import { createToken, getUsers, updateUsersData } from './utils';

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
  console.log('user', user);
  if (user) {
    const token = createToken(user.id);
    res.send(JSON.stringify({ user, token }));
  } else res.sendStatus(400);
});

app.post('/api/auth/signUp', (req: Request, res: Response) => {
  const users = getUsers();
  console.log(' up req.body', req.body);
  const candidate = users.find((item) => item.username === req.body.username);
  console.log('candidate', candidate);
  if (!candidate) {
    console.log('000');
    const { id } = users[users.length - 1];
    const newUser: IUser = req.body;
    newUser.id = id + 1;
    newUser.favorites = [];
    const token = createToken(newUser.id);
    res.send({ newUser, token });
    users.push(newUser);
    updateUsersData(users);
  } else res.sendStatus(400);
});
