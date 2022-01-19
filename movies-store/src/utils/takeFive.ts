// import { IMovie, IPerson, ITvShow } from './../interfaces';
// type Multi = IMovie[] | ITvShow[] | IPerson[];

// import { Type } from "typescript";

export const takeFirstFive = <Type>(data: Type[]): Type[] => {
  return data.slice(0, 5);
};
