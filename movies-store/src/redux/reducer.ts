import { IUser } from '../interfaces';
import { UserAction, Favorite } from './actions';

export type State = {
  user: IUser | null;
};

const initialState: State = { user: null };
const reducer = (state: State = initialState, action: UserAction | Favorite): State => {
  switch (action.type) {
    case 'auth':
      return {
        ...state,
        user: (action as UserAction).value,
      };
    case 'update':
      return {
        ...state,
        user: {
          ...(state.user as IUser),
          favorites: (action as Favorite).value,
        },
      };
    default:
      return state;
  }
};

export default reducer;
