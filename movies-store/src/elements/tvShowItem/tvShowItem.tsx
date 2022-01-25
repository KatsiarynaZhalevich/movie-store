import React from 'react';
import { ITvShow } from '../../interfaces';
import { IMAGE_URL, POSTER_PLACEHOLDER } from '../../variables';

/* eslint-disable*/
const TvShowItem = ({ id, name, poster_path, first_air_date, overview, number_of_seasons }: ITvShow): JSX.Element => {
  return (
    <div key={id} className="result-item">
              <div className="image-wrapper">
                <img
                  src={poster_path ? `${IMAGE_URL}${poster_path}` : POSTER_PLACEHOLDER}
                  alt={name}
                />
              </div>
              <div className="info">
                <h3>
                  {name} {first_air_date ? `${first_air_date.slice(0, 4)}` : ""}
                </h3>
                <p>{overview || 'no overview'}</p>
                <p>
                  Number of seasons: <strong>{number_of_seasons || '1'}</strong>
                </p>
              </div>
            </div>
  );
};
export default TvShowItem;
