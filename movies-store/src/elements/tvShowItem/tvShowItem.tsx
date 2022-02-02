import React from 'react';
import { ITvShow, IUser } from '../../interfaces';
import { IMAGE_URL, POSTER_PLACEHOLDER } from '../../variables';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import getUser from '../../redux/selectors';
import { addToFavorite, deleteFromFavorite } from '../../utils/utils';
import { updateFavoriteItem } from '../../redux/actions';

/* eslint-disable*/
const TvShowItem = ({
  id,
  name,
  poster_path,
  first_air_date,
  overview,
  number_of_seasons,
}: ITvShow): JSX.Element => {

  const dispatch = useDispatch();
  const user: IUser | null = useSelector(getUser);
  const mediaType = new URLSearchParams(location.search).get('media_type');
  
  const addFavorite = async() => {
    if(user) {
      const updatedFavorites = await addToFavorite(user.id, id, mediaType); 
      dispatch(updateFavoriteItem(updatedFavorites));
    }
  }

  const deleteFavorite = async() => {
    if(user) {
      const updatedFavorites = await deleteFromFavorite(user.id, id, mediaType);
      dispatch(updateFavoriteItem(updatedFavorites));
    }
  }
  
  return (
    <div key={id} className="result-item">
      {!user ? null : user?.favorites.tvShow.find((tvShoeId) => tvShoeId === id)? (
      <IconButton size="large" aria-label="search" color="inherit" className="favorite" onClick={deleteFavorite}>
        <BookmarkIcon className="icon" />
      </IconButton>
      ) : (
        <IconButton size="large" aria-label="search" color="inherit" className="favorite" onClick={addFavorite}>
        <BookmarkBorderIcon className="icon" />
      </IconButton>
      )}
      <div className="image-wrapper">
        <img src={poster_path ? `${IMAGE_URL}${poster_path}` : POSTER_PLACEHOLDER} alt={name} />
      </div>
      <div className="info">
        <h3>
          {name} {first_air_date ? `${first_air_date.slice(0, 4)}` : ''}
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
