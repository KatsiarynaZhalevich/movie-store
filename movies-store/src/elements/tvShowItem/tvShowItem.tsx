import React from 'react';
import { ITvShow, IUser } from '../../interfaces';
import { IMAGE_URL, POSTER_PLACEHOLDER, ROUTES } from '../../variables';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import getUser from '../../redux/selectors';
import { addToFavorite, deleteFromFavorite } from '../../utils/utils';
import { updateFavoriteItem } from '../../redux/actions';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();
  const user: IUser | null = useSelector(getUser);
  
  const addFavorite = async() => {
    if(user) {
      const updatedFavorites = await addToFavorite(user.id, id, 'tvShow'); 
      dispatch(updateFavoriteItem(updatedFavorites));
    }
  }

  const deleteFavorite = async() => {
    if(user) {
      const updatedFavorites = await deleteFromFavorite(user.id, id, 'tvShow');
      dispatch(updateFavoriteItem(updatedFavorites));
    }
  }
  const setRoute = () => {
    history.push({
      pathname: ROUTES.MOVIE_PAGE,
      search: `media_type=tvShow&id=${id}`,
    });
  }
  
  return (
    <div key={id} className="result-item">
      {!user ? null : user?.favorites.tvShow.find((tvShowId) => tvShowId === id)? (
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
        <h3 onClick={setRoute}>
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
