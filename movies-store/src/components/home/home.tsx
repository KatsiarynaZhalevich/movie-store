import React, { useCallback, useEffect, useState } from 'react';
import './home.scss';
import { IBaseMovie, IPerson } from '../../interfaces';
import { API_KEY, API_LINK, IMAGE_URL, PERSON_PLACEHOLDER, ROUTES } from '../../variables';
import Skeleton from '@mui/material/Skeleton';
import { useHistory } from 'react-router-dom';

const Home = (): JSX.Element => {
  const [load, setLoad] = useState({
    loadMovie: false,
    loadTvShow: false,
    loadPeople: false,
  });
  const history = useHistory();

  const [trendMovies, setTrendMovie] = useState<IBaseMovie[]>([]);
  const [trendTvShows, setTrendTvShows] = useState<IBaseMovie[]>([]);
  const [trendPeople, setTrendPeople] = useState<IPerson[]>([]);

  const getTrendMovies = useCallback(() => {
    setLoad({ ...load, loadMovie: true });
    fetch(`${API_LINK}trending/movie/day${API_KEY}`)
      .then((response) => response.json())
      .then((response) => {
        setTrendMovie(response.results);
        setLoad({ ...load, loadMovie: false });
      });
  }, []);
  const getTrendTvShows = useCallback(() => {
    setLoad({ ...load, loadTvShow: true });
    fetch(`${API_LINK}trending/tv/day${API_KEY}`)
      .then((response) => response.json())
      .then((response) => {
        setTrendTvShows(response.results);
        setLoad({ ...load, loadTvShow: false });
      });
  }, []);

  const getTrendPeople = useCallback(() => {
    setLoad({ ...load, loadPeople: true });
    fetch(`${API_LINK}trending/person/day${API_KEY}`)
      .then((response) => response.json())
      .then((response) => {
        setTrendPeople(response.results);
        setLoad({ ...load, loadPeople: false });
      });
  }, []);

  useEffect(() => {
    getTrendMovies();
    getTrendTvShows();
    getTrendPeople();
  }, []);

  const setRoute = (route: string, id: number) => {
    history.push({
      pathname: route,
      search: `id=${id}`,
    });
  };
  return (
    <section className="content home">
      <div className="section-item">
        <h2>Trends movies</h2>
        <div className="movies-wrapper">
          {trendMovies.map((movie: IBaseMovie) =>
            !load.loadMovie ? (
              <a href="#" key={movie.id} className="movie-item">
                <img src={`${IMAGE_URL}${movie.poster_path}`}></img>
              </a>
            ) : (
              <Skeleton key={movie.id} variant="rectangular" height={200} width={100} />
            )
          )}
        </div>
      </div>
      <div className="section-item">
        <h2>Trends tvShows</h2>
        <div className="movies-wrapper">
          {trendTvShows.map((tvShow: IBaseMovie) =>
            !load.loadTvShow ? (
              <a href="#" key={tvShow.id} className="movie-item">
                <img src={`${IMAGE_URL}${tvShow.poster_path}`}></img>
              </a>
            ) : (
              <Skeleton key={tvShow.id} variant="rectangular" height={200} width={100} />
            )
          )}
        </div>
      </div>
      <div className="section-item -people">
        <h2>Trends people</h2>
        <div className="people-wrapper">
          {trendPeople.map((person: IPerson) =>
            !load.loadPeople ? (
              <div
                // href="#"
                key={person.id}
                className="person-item"
                onClick={() => setRoute(ROUTES.PERSON_ROUTE, person.id)}
              >
                <img
                  src={
                    person.profile_path ? `${IMAGE_URL}${person.profile_path}` : PERSON_PLACEHOLDER
                  }
                ></img>
                <span onClick={() => setRoute(ROUTES.PERSON_ROUTE, person.id)}>{person.name}</span>
              </div>
            ) : (
              <Skeleton key={person.id} variant="rectangular" height={200} width={100} />
            )
          )}
        </div>
      </div>
    </section>
  );
};
export default Home;
