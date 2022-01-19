export interface IUser {
  id: number;
  username: string;
  password: string;
  role: string;
  phone?: string;
  token?: number;
  favorites: number[];
}

export interface IToken {
  token: number;
  userId: number;
}

export interface IBaseMovie {
  id: number;
  genre: string[] | number[];
  poster_path: string;
  release_date: string;
  overview: string;
  media_type: string;
  createdBy: string;
  production_companies: string;
  country: string;
  vote_average: number[];
}
export interface IMovie extends IBaseMovie {
  title: string;
}
export interface ITvShow extends IBaseMovie {
  name: string;
  number_of_seasons: number;
}
export interface IPerson {
  id: number;
  name: string;
  birthday: string;
  deathday: string;
  biography: string;
  place_of_birth: string;
  profile_path: string;
  media_type: string;
}
