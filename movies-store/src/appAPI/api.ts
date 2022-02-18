import { IMovie, IPerson, ITvShow, ISearch } from '../interfaces';
import { API_KEY, API_LINK } from '../variables';

export const getMovies = async (ids: number[], type: string) => {
  const preparedArrayIds = ids.map(async (id: number): Promise<IMovie> => {
    const result = await fetch(`${API_LINK}${type}/${id}${API_KEY}`);
    return result.json();
  });

  const data = await Promise.all(preparedArrayIds);

  return data;
};

export const getTvShows = async (ids: number[], type: string) => {
  const preparedArrayIds = ids.map(async (id: number): Promise<ITvShow> => {
    const result = await fetch(`${API_LINK}${type}/${id}${API_KEY}`);
    return result.json();
  });

  const data = await Promise.all(preparedArrayIds);

  return data;
};

export const searchNewValue = async (newSearch: string): Promise<ISearch> => {
  const result = await fetch(
    `${API_LINK}search/multi${API_KEY}&language=en-US&query=${newSearch}&page=1&include_adult=false`
  )
    .then((response) => response.json())
    .then((response) => {
      const movieToShow: IMovie[] = response.results
        .filter((searchItem: IMovie) => searchItem.media_type === 'movie')
        .slice(0, 5);
      const tvShowToShow: ITvShow[] = response.results
        .filter((searchItem: ITvShow) => searchItem.media_type === 'tv')
        .slice(0, 5);
      const peopleToShow: IPerson[] = response.results
        .filter((searchItem: IPerson) => searchItem.media_type === 'person')
        .slice(0, 5);
      return { movieToShow, tvShowToShow, peopleToShow };
    });

  return result;
};
