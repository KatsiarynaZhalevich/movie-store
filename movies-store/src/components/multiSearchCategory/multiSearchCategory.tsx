import React, { useCallback, useEffect, useState } from 'react';
import { Pagination, Stack } from '@mui/material';
import './multiSearchCategory.scss';
import { useLocation } from 'react-router-dom';
import { API_KEY, API_LINK } from '../../variables';
import { IMovie, ITvShow, IPerson } from '../../interfaces';
import PersonItem from '../../elements/personItem/personItem';
import MovieItem from '../../elements/movieItem/movieItem';
import TvShowItem from '../../elements/tvShowItem/tvShowItem';

type Result = {
  people: IPerson[];
  movie: IMovie[];
  tvShow: ITvShow[];
};

const MultiSearchCategory = (): JSX.Element => {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const mediaType = search.get('media_type');
  const query = search.get('search') || '';
  const [searchResult, setSearchResult] = useState<Result>({
    people: [],
    movie: [],
    tvShow: [],
  });
  const [allPages, setAllPages] = useState({
    all: 1,
    currentPage: 1,
  });

  const getData = useCallback(() => {
    let type = mediaType;
    type === 'tvShow' ? (type = 'tv') : type;
    const link = `${API_LINK}search/${type}${API_KEY}&query=${query}&page=${allPages.currentPage}`;

    fetch(link)
      .then((response) => response.json())
      .then((response) => {
        setAllPages({ ...allPages, all: response.total_pages });
        switch (mediaType) {
          case 'person':
            setSearchResult({ ...searchResult, people: response.results });
            break;
          case 'movie':
            setSearchResult({ ...searchResult, movie: response.results });
            break;
          case 'tvShow':
            setSearchResult({ ...searchResult, tvShow: response.results });
            break;
          default:
            break;
        }
      });
  }, [location.search, allPages.currentPage]);

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, [location.search, allPages.currentPage]);

  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setAllPages({ ...allPages, currentPage: value });
  };
  return (
    <div className="content global-search">
      <div className="right-part">
        <p>
          Search: <strong>{query}</strong>
        </p>
        {mediaType === 'person' ? (
          searchResult.people ? (
            searchResult.people.map((res: IPerson) => (
              <PersonItem
                key={res.id}
                id={res.id}
                name={res.name}
                profile_path={res.profile_path}
                known_for_department={res.known_for_department}
              />
            ))
          ) : (
            <p>
              no result: <strong> {query}</strong>
            </p>
          )
        ) : mediaType === 'movie' ? (
          searchResult.movie ? (
            searchResult.movie.map((res: IMovie) => (
              <MovieItem
                key={res.id}
                id={res.id}
                title={res.title}
                poster_path={res.poster_path}
                release_date={res.release_date}
                overview={res.overview}
              />
            ))
          ) : (
            <p>
              no result: <strong> {query}</strong>
            </p>
          )
        ) : searchResult.tvShow ? (
          searchResult.tvShow.map((res: ITvShow) => (
            <TvShowItem
              key={res.id}
              id={res.id}
              name={res.name}
              poster_path={res.poster_path}
              first_air_date={res.first_air_date}
              overview={res.overview}
              number_of_seasons={res.number_of_seasons}
            />
          ))
        ) : (
          <p>
            no result: <strong> {query}</strong>
          </p>
        )}
        {allPages.all != 1 ? (
          <Stack spacing={2} className="pagination">
            <Pagination
              count={allPages.all}
              page={allPages.currentPage}
              showFirstButton
              showLastButton
              onChange={changePage}
            />
          </Stack>
        ) : null}
      </div>
    </div>
  );
};
export default MultiSearchCategory;
