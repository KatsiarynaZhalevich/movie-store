import React, { useCallback, useEffect, useState } from 'react';
import './favorites.scss';
import { IMovie, ITvShow, IUser } from '../../interfaces';
import { useSelector } from 'react-redux';
import getUser from '../../redux/selectors';
import { PROGRESS_STYLE } from '../../variables';
import { CircularProgress, Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import MovieItem from '../../elements/movieItem/movieItem';
import TvShowItem from '../../elements/tvShowItem/tvShowItem';
import { getMovies, getTvShows } from '../../appAPI/api';

const Favorites = (): JSX.Element => {
  const user: IUser | null = useSelector(getUser);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [tvShows, setTvShows] = useState<ITvShow[]>([]);
  const [load, setLoad] = useState(false);
  const [tab, setTab] = React.useState('1');

  const tabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const getData = useCallback(async () => {
    setLoad(true);
    if (user?.favorites.movie) {
      const data = await getMovies(user.favorites.movie, 'movie');
      setMovies(data);
    }

    if (user?.favorites.tvShow) {
      const tvShowsData = await getTvShows(user.favorites.tvShow, 'tv');
      setTvShows(tvShowsData);
    }

    setLoad(false);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  if (load) {
    return (
      <div data-testid="spinner" className="content">
        <CircularProgress sx={PROGRESS_STYLE} />
      </div>
    );
  }

  return (
    <section className=" content">
      {user && (user?.favorites.movie.length > 0 || user?.favorites.tvShow.length > 0) ? (
        <div className="favorites">
          <h1>My favorites</h1>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  className="123456"
                  sx={{ '& .MuiTabs-indicator': { backgroundColor: '#ff6600' } }}
                  onChange={tabChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    sx={{ '&.Mui-selected': { color: '#ff6600' } }}
                    label={`Movies (${user.favorites.movie.length})`}
                    value="1"
                  />
                  <Tab
                    sx={{ '&.Mui-selected': { color: '#ff6600' } }}
                    label={`TvShows (${user.favorites.tvShow.length})`}
                    value="2"
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                {user.favorites.tvShow.length > 0 ? (
                  movies.map((movie: IMovie) => (
                    <MovieItem
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      poster_path={movie.poster_path}
                      release_date={movie.release_date}
                      overview={movie.overview}
                    />
                  ))
                ) : (
                  <p>nothing to show!!!</p>
                )}
              </TabPanel>
              <TabPanel value="2">
                {tvShows.length > 0 ? (
                  tvShows.map((tvShow: ITvShow) => (
                    <TvShowItem
                      key={tvShow.id}
                      id={tvShow.id}
                      name={tvShow.name}
                      poster_path={tvShow.poster_path}
                      first_air_date={tvShow.first_air_date}
                      overview={tvShow.overview}
                      number_of_seasons={tvShow.number_of_seasons}
                    />
                  ))
                ) : (
                  <p>!!!nothing to show</p>
                )}
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      ) : (
        <h3>Favorites list is empty </h3>
      )}
    </section>
  );
};
export default Favorites;
