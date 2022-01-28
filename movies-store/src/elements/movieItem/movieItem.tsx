import { IconButton } from '@mui/material';
import React from 'react';
import { IMovie } from '../../interfaces';
import { IMAGE_URL, POSTER_PLACEHOLDER } from '../../variables';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

/* eslint-disable*/
const MovieItem = ({ id, title, poster_path, release_date, overview }: IMovie): JSX.Element => {
  return (
    <div key={id} className="result-item">
      <IconButton size="large" aria-label="search" color="inherit" className="favorite">
        <BookmarkBorderIcon className="icon" />
      </IconButton>
      <div className="image-wrapper">
        <img src={poster_path ? `${IMAGE_URL}${poster_path}` : POSTER_PLACEHOLDER} alt={title} />
      </div>
      <div className="info">
        <h3>
          {title} {release_date ? `${release_date.slice(0, 4)}` : ''}
        </h3>
        <p>{overview || 'no overview'}</p>
      </div>
    </div>
  );
};
export default MovieItem;
