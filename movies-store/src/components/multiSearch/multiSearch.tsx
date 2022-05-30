import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IMovie, IPerson, ITvShow } from '../../interfaces';
import { API_LINK, API_KEY, ROUTES } from '../../variables';
import './multiSearch.scss';
import { Button } from '@mui/material';
import TvShowItem from '../../elements/tvShowItem/tvShowItem';
import MovieItem from '../../elements/movieItem/movieItem';
import PersonItem from '../../elements/personItem/personItem';

const MultiSearch = (): JSX.Element => {
  const location = useLocation();
  const history = useHistory();
  const search = new URLSearchParams(location.search).get('search');
  const [searchMovie, setSearchMovie] = useState<IMovie[]>([]);
  const [searchTvShow, setSearchTvShow] = useState<ITvShow[]>([]);
  const [searchPeople, setSearchPeople] = useState<IPerson[]>([]);

  const getSearchData = useCallback(
    (page = 1) => {
      fetch(
        `${API_LINK}search/multi${API_KEY}&language=en-US&query=${search}&page=${page}&include_adult=false`
      )
        .then((response) => response.json())
        .then((response) => {
          const movieToShow = response.results
            .filter((searchItem: IMovie) => searchItem.media_type === 'movie')
            .slice(0, 4);
          const tvShowToShow = response.results
            .filter((searchItem: ITvShow) => searchItem.media_type === 'tv')
            .slice(0, 4);
          const peopleToShow = response.results
            .filter((searchItem: IPerson) => searchItem.media_type === 'person')
            .slice(0, 4);

          setSearchMovie(movieToShow);
          setSearchTvShow(tvShowToShow);
          setSearchPeople(peopleToShow);
        });
    },
    [search]
  );

  useEffect(() => {
    getSearchData();
  }, [getSearchData]);

  const setRoute = (path: string, type?: string): void => {
    history.push({
      pathname: path,
      search: `search=${search}&media_type=${type}` || '',
    });
  };

  return (
    <section className="content multi-search">
      <p>
        Search: <strong>{search}</strong>
      </p>
      <div className="multi-search-container">
        {searchPeople.length > 0 ? (
          <div>
            <div className="title">
              <h3>People</h3>
              <Button
                variant="contained"
                disabled={searchPeople.length > 0 ? false : true}
                onClick={() => {
                  setRoute(ROUTES.MULTI_SEARCH_CATEGORY_PAGE_ROUTE, 'person');
                }}
              >
                See more
              </Button>
            </div>
            {searchPeople.map((person: IPerson) => (
              <PersonItem
                key={person.id}
                id={person.id}
                name={person.name}
                profile_path={person.profile_path}
                known_for_department={person.known_for_department}
              />
            ))}
          </div>
        ) : (
          <div className="empty-search-list">
            <p>
              Nothing to show in <strong>People</strong>
            </p>
            <Button
              variant="contained"
              onClick={() => {
                setRoute(ROUTES.MULTI_SEARCH_CATEGORY_PAGE_ROUTE, 'person');
              }}
            >
              search more
            </Button>
          </div>
        )}
      </div>
      <div className="multi-search-container">
        {searchMovie.length > 0 ? (
          <div>
            <div className="title">
              <h3>Movies</h3>
              <Button
                variant="contained"
                disabled={searchMovie.length > 0 ? false : true}
                onClick={() => {
                  setRoute(ROUTES.MULTI_SEARCH_CATEGORY_PAGE_ROUTE, 'movie');
                }}
              >
                See more
              </Button>
            </div>
            {searchMovie.map((movie: IMovie) => (
              <MovieItem
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                release_date={movie.release_date}
                overview={movie.overview}
                media_type="movie"
              />
            ))}
          </div>
        ) : (
          <div className="empty-search-list">
            <p>
              Nothing to show in <strong>Movies</strong>
            </p>
            <Button
              variant="contained"
              onClick={() => {
                setRoute(ROUTES.MULTI_SEARCH_CATEGORY_PAGE_ROUTE, 'movie');
              }}
            >
              search more
            </Button>
          </div>
        )}
      </div>
      <div className="multi-search-container">
        {searchTvShow.length > 0 ? (
          <div>
            <div className="title">
              <h3>TvShows</h3>
              <Button
                variant="contained"
                disabled={searchTvShow.length > 0 ? false : true}
                onClick={() => {
                  setRoute(ROUTES.MULTI_SEARCH_CATEGORY_PAGE_ROUTE, 'tvShow');
                }}
              >
                See more
              </Button>
            </div>
            {searchTvShow.map((tvShow: ITvShow) => (
              <TvShowItem
                key={tvShow.id}
                id={tvShow.id}
                name={tvShow.name}
                poster_path={tvShow.poster_path}
                first_air_date={tvShow.first_air_date}
                overview={tvShow.overview}
                number_of_seasons={tvShow.number_of_seasons}
                media_type="tvShow"
              />
            ))}
          </div>
        ) : (
          <div className="empty-search-list">
            <p>
              Nothing to show in <strong>TvShows</strong>
            </p>
            <Button
              variant="contained"
              onClick={() => {
                setRoute(ROUTES.MULTI_SEARCH_CATEGORY_PAGE_ROUTE, 'tvShow');
              }}
            >
              search more
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
export default MultiSearch;
