import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// import { takeFirstFive } from '../../utils/utils';
import { IMovie, IPerson, ITvShow } from '../../interfaces';
import { API_LINK, API_KEY, IMAGE_URL, PERSON_PLACEHOLDER, ROUTES } from '../../variables';
import './searchPage.scss';
import { Button } from '@mui/material';

const SearchPage = (): JSX.Element => {
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
            .slice(0, 5);
          const tvShowToShow = response.results
            .filter((searchItem: ITvShow) => searchItem.media_type === 'tv')
            .slice(0, 5);
          const peopleToShow = response.results
            .filter((searchItem: IPerson) => searchItem.media_type === 'person')
            .slice(0, 5);

          setSearchMovie(movieToShow);
          setSearchTvShow(tvShowToShow);
          setSearchPeople(peopleToShow);
          // setSearchMovie(searchMovie.concat(movieToShow).slice(0, 5));
          // setSearchTvShow(searchTvShow.concat(tvShowToShow).slice(0, 5));
          // setSearchPeople([...searchPeople, ...peopleToShow].slice(0, 5));
          // if (
          //   (movieToShow.length < 5 || tvShowToShow.length < 5 || peopleToShow.length < 5) &&
          //   page < 2
          // ) {
          //   getSearchData(page + 1);
          // }
        });
    },
    [search]
  );

  useEffect(() => {
    getSearchData();
  }, [getSearchData]);

  const setRoute = (path: string, search?: string): void => {
    history.push({
      pathname: path,
      search: search || '',
    });
  };

  return (
    <section className="content multi-search">
      <p>
        Search: <strong>{search}</strong>
      </p>
      <div className="multi-search-container">
        <div className="title">
          <h3>People</h3>
          <Button
            variant="contained"
            disabled={searchPeople.length > 0 ? false : true}
            onClick={() => {
              setRoute(ROUTES.GLOBAL_SEARCH, 'media_type=person');
            }}
          >
            See more
          </Button>
        </div>
        {searchPeople.length > 0 ? (
          searchPeople.map((person: IPerson) => (
            <div key={person.id} className="data">
              <div className="image-wrapper">
                <img
                  src={
                    person.profile_path ? `${IMAGE_URL}${person.profile_path}` : PERSON_PLACEHOLDER
                  }
                  alt=""
                />
              </div>
              <div className="search-item-info">
                <a href="#">{person.name}</a>
                <p>{person.known_for_department}</p>
                <p></p>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-search-list">no people to show</p>
        )}
      </div>
      <div className="multi-search-container">
        <div className="title">
          <h3>Movies</h3>
          <Button
            variant="contained"
            disabled={searchMovie.length > 0 ? false : true}
            onClick={() => {
              setRoute(ROUTES.GLOBAL_SEARCH, 'media_type=movie');
            }}
          >
            See more
          </Button>
        </div>
        {searchMovie.length > 0 ? (
          searchMovie.map((movie: IMovie) => (
            <div key={movie.id} className="data">
              <div className="image-wrapper">
                <img
                  src={movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : PERSON_PLACEHOLDER}
                  alt=""
                />
              </div>
              <div className="search-item-info">
                <a href="#">{movie.title}</a>
                <p>{movie.release_date.slice(0, 4)}</p>
                <p></p>
              </div>
            </div>
          ))
        ) : (
          <li className="empty-search-list">nothing to show</li>
        )}
      </div>
      <div className="multi-search-container">
        <div className="title">
          <h3>TvShows</h3>
          <Button
            variant="contained"
            disabled={searchTvShow.length > 0 ? false : true}
            onClick={() => {
              setRoute(ROUTES.GLOBAL_SEARCH, 'media_type=tv');
            }}
          >
            See more
          </Button>
        </div>
        {searchTvShow.length > 0 ? (
          searchTvShow.map((tvShow: ITvShow) => (
            <div key={tvShow.id} className="data">
              <div className="image-wrapper">
                <img
                  src={
                    tvShow.poster_path ? `${IMAGE_URL}${tvShow.poster_path}` : PERSON_PLACEHOLDER
                  }
                  alt=""
                />
              </div>
              <div className="search-item-info">
                <a href="#">{tvShow.name}</a>
                <p>{tvShow.first_air_date.slice(0, 4)}</p>
                <p></p>
              </div>
            </div>
          ))
        ) : (
          <li className="empty-search-list">nothing to show</li>
        )}
      </div>
    </section>
  );
};
export default SearchPage;
