import { State } from './reducer';
import { IUser } from '../interfaces';

const getUser = (state: State): IUser | null => state.user;

export default getUser;
