import React, { useCallback, useEffect, useState } from 'react';
import './movie.scss';
import {
  API_KEY,
  API_LINK,
  IMAGE_URL,
  POSTER_PLACEHOLDER,
  PROGRESS_STYLE,
  ROUTES,
} from '../../variables';
import { CircularProgress } from '@mui/material';
import { ICountry, IGenre, IMovie, IPerson, ITvShow } from '../../interfaces';
import { useHistory, useLocation } from 'react-router-dom';

const Movie = (): JSX.Element => {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const [id, setId] = useState(search.get('id'));
  const [mediaType, setMediaType] = useState(search.get('media_type') === 'movie' ? 'movie' : 'tv');
  const [load, setLoad] = useState(false);
  const [data, setData] = useState<IMovie | ITvShow>();
  const [similar, setSimilar] = useState([]);
  const [actors, setActors] = useState<String[]>([]);
  const history = useHistory();
  console.log('location', location.search);
  const getData = useCallback(() => {
    setLoad(true);
    fetch(`${API_LINK}${mediaType}/${id}${API_KEY}`)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          setLoad(false);

          response.production_countries = response.production_countries
            .map((country: ICountry) => {
              return country.name;
            })
            .join(', ');
          response.genres = response.genres
            .map((genre: IGenre) => {
              return genre.name;
            })
            .join(', ');

          setData(response);
        }
      });
  }, [location.search, id, mediaType]);

  const getSimilarData = useCallback(() => {
    setLoad(true);
    fetch(`${API_LINK}${mediaType}/${id}/similar${API_KEY}`)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          setLoad(false);
          setSimilar(response.results.slice(0, 5));
        }
      });
  }, [location.search, id, mediaType]);

  const getActors = useCallback(() => {
    setLoad(true);
    const actorsArr: String[] = [];
    fetch(`${API_LINK}${mediaType}/${id}/credits${API_KEY}`)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          setLoad(false);
          response.cast.map((actor: IPerson) => {
            actorsArr.push(actor.name);
          });
          setActors(actorsArr.slice(0, 10));
        }
      });
  }, [location.search, id, mediaType]);

  useEffect(() => {
    console.log('11');

    setId(search.get('id'));
    setMediaType(search.get('media_type') === 'movie' ? 'movie' : 'tv');
    getData();
    getSimilarData();
    getActors();
  }, [location.search, id, mediaType]);
  console.log('id', id);
  console.log('type', mediaType);

  const setRoute = (id: number) => {
    setId(String(id));
    history.push({ 
      pathname: ROUTES.MOVIE_PAGE,
      search: `media_type=${mediaType}&id=${id}`,
    });
  };

  if (load) {
    return (
      <div className="content">
        <CircularProgress sx={PROGRESS_STYLE} />
      </div>
    );
  }
  return (
    <section className="page content ">
      <div className="movie-info">
        <div className="top-info">
          <div className="image">
            <img
              src={data?.poster_path ? `${IMAGE_URL}${data?.poster_path}` : POSTER_PLACEHOLDER}
              alt={(data as IMovie)?.title || (data as ITvShow)?.name}
            />
          </div>
          <div className="main-info">
            <h1>{(data as IMovie)?.title || (data as ITvShow)?.name}</h1>
            {(data as IMovie)?.release_date || (data as ITvShow)?.first_air_date ? (
              <p>
                <strong>Year: </strong>
                <span>
                  {(data as IMovie)?.release_date?.slice(0, 4) ||
                    (data as ITvShow)?.first_air_date?.slice(0, 4)}
                </span>
              </p>
            ) : null}
            <p>
              <strong>Genre: </strong>
              <span>{data?.genres}</span>
            </p>
            <p>
              <strong>Countries: </strong>
              <span>{data?.production_countries}</span>
            </p>
            {data?.budget ? (
              <p>
                <strong>Budget: </strong>
                <span>{data?.budget}</span>
              </p>
            ) : null}
            <p>
              <strong>Vote average: </strong>
              <span>
                {data?.vote_average} <span className="small">({data?.vote_count})</span>
              </span>
            </p>
            {data?.popularity ? (
              <p>
                <strong>Popularity: </strong>
                <span>{data?.popularity}</span>
              </p>
            ) : null}
            {(data as ITvShow)?.number_of_seasons ? (
              <p>
                <strong>Number of seasons: </strong>
                <span>{(data as ITvShow)?.number_of_seasons}</span>
              </p>
            ) : null}
          </div>
          <div className="actors">
            <p>
              <strong>Cast</strong>
            </p>
            {actors?.map((actor: String, index: number) => (
              <p key={index}>{actor}</p>
            ))}
          </div>
        </div>
        <div className="overview">
          <p>{data?.overview}</p>
        </div>
        <div className="similar">
          <h4>Similar</h4>
          <div className="similar-container">
            {similar.map((item: IMovie | ITvShow) => (
              <div key={item.id} onClick={() => setRoute(item.id)}>
                <img
                  src={item.poster_path ? `${IMAGE_URL}${item.poster_path}` : POSTER_PLACEHOLDER}
                  alt={(item as IMovie).title || (item as ITvShow).name}
                />
                <p>{(item as IMovie).title || (item as ITvShow).name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Movie;
