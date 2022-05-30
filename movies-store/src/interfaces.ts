export interface IUser {
  id: number;
  username: string;
  password: string;
  phone?: string;
  token?: number;
  favorites: IFavorites;
}

export interface IFavorites {
  movie: number[];
  tvShow: number[];
}
export interface IToken {
  token: number;
  userId: number;
}

export interface IBaseMovie {
  id: number;
  poster_path: string;
  overview: string;
  media_type?: string;
  genres?: string;
  createdBy?: string;
  production_companies?: string;
  production_countries?: string;
  vote_average?: number;
  vote_count?: number;
  character?: string;
  job?: string;
  budget?: number;
  popularity?: number;
}
export interface IMovie extends IBaseMovie {
  title: string;
  release_date: string;
}
export interface ITvShow extends IBaseMovie {
  name: string;
  first_air_date: string;
  number_of_seasons: number;
}
export interface IPerson {
  id: number;
  name: string;
  birthday?: string;
  deathday?: string;
  biography?: string;
  place_of_birth?: string;
  profile_path: string;
  media_type?: string;
  known_for_department: string;
  popularity?: number;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface ICredits {
  id: number;
  title: string;
  year: number;
  job?: string;
  vote_average: number;
  character?: string;
  media_type: string;
}

export interface ICountry {
  id: number;
  iso_3166_1: string;
  name: string;
}

export interface ISearch {
  movieToShow: IMovie[];
  tvShowToShow: ITvShow[];
  peopleToShow: IPerson[];
}
