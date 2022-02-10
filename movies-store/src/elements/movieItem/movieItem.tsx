import React from 'react';
import { IconButton } from '@mui/material';
import { IMovie, IUser } from '../../interfaces';
import { IMAGE_URL, POSTER_PLACEHOLDER, ROUTES } from '../../variables';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useDispatch, useSelector } from 'react-redux';
import getUser from '../../redux/selectors';
import { addToFavorite, deleteFromFavorite } from '../../utils/utils';
import { updateFavoriteItem } from '../../redux/actions';
import { useHistory } from 'react-router-dom';

/* eslint-disable*/
const MovieItem = ({ id, title, poster_path, release_date, overview, media_type = '' }: IMovie): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user: IUser | null = useSelector(getUser);
  const search = new URLSearchParams(location.search);

  const mediaType = search.get('media_type') || media_type;

  
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
  const setRoute = () => {
    history.push({
      pathname: ROUTES.MOVIE_PAGE,
      search: `media_type=${mediaType}&id=${id}`,
    });
  }
  return (
    <div key={id} className="result-item">
      {!user ? null : user?.favorites.movie.find((movieId) => movieId === id) ? (
      <IconButton size="large" aria-label="search" color="inherit" className="favorite" onClick={deleteFavorite}>
        <BookmarkIcon className="icon" />
      </IconButton>
      ) : (
        <IconButton size="large" aria-label="search" color="inherit" className="favorite" onClick={addFavorite}>
        <BookmarkBorderIcon className="icon" />
      </IconButton>
      )}
      <div className="image-wrapper">
        <img src={poster_path ? `${IMAGE_URL}${poster_path}` : POSTER_PLACEHOLDER} alt={title} />
      </div>
      <div className="info">
        <h3 onClick={setRoute}>
          {title} {release_date ? `${release_date.slice(0, 4)}` : ''}
        </h3>
        <p>{overview || 'no overview'}</p>
      </div>
    </div>
  );
};
export default MovieItem;
