import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
// import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import MenuIcon from '@mui/icons-material/Menu';
// // import Modal from 'react-modal';
import './header.scss';
import { InputBase } from '@mui/material';
import MenuElement from '../../elements/menu/menuElement';
import { API_KEY, API_LINK, ROUTES } from '../../variables';
import { IMovie, IPerson, ITvShow } from '../../interfaces';
import { takeFirstFive } from '../../utils/utils';
import { useHistory } from 'react-router-dom';

//      START SEARCH SETTINGS          //
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const menuItemStyle = {
  width: '160px',
  fontWeight: 'bold',
};

const profileMenuItemStyle = {
  width: '120px',
  fontWeight: 'bold',
};

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
//     END SEARCH SETTINGS   ///

const Header = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState({
    value: '',
    show: false,
  });
  const [searchMovie, setSearchMovie] = useState<IMovie[]>([]);
  const [searchTvShow, setSearchTvShow] = useState<ITvShow[]>([]);
  const [searchPeople, setSearchPeople] = useState<IPerson[]>([]);
  const history = useHistory();

  const getSearchItem = (search: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = search.target.value;
    setSearchValue({
      show: newSearch.trim().length > 2 ? true : false,
      value: newSearch.trim() ? newSearch : '',
    });

    if (newSearch.trim().length > 2) {
      try {
        fetch(
          `${API_LINK}search/multi${API_KEY}&language=en-US&query=${newSearch}&page=1&include_adult=false`
        )
          .then((response) => response.json())
          .then((response) => {
            const movieToShow: IMovie[] = takeFirstFive(
              response.results.filter((searchItem: IMovie) => searchItem.media_type === 'movie')
            );
            setSearchMovie(movieToShow);
            const tvShowToShow: ITvShow[] = takeFirstFive(
              response.results.filter((searchItem: ITvShow) => searchItem.media_type === 'tv')
            );
            setSearchTvShow(tvShowToShow);
            const peopleToShow: IPerson[] = takeFirstFive(
              response.results.filter((searchItem: IPerson) => searchItem.media_type === 'person')
            );
            setSearchPeople(peopleToShow);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const closeSearch = (): void => {
    setSearchValue({ ...searchValue, show: false });
  };

  const setRoute = (path: string, search?: string): void => {
    if (path === ROUTES.MULTI_SEARCH_PAGE_ROUTE && searchValue.value.length > 2) {
      history.push({
        pathname: path,
        search: `search=${search}` || '',
      });
      setSearchValue({ value: '', show: false });
    } else {
      history.push({
        pathname: path,
        search: search || '',
      });
    }
  };

  const checkEnter = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      setRoute(ROUTES.MULTI_SEARCH_PAGE_ROUTE, searchValue.value);
    }
  };

  return (
    <header className="header">
      <div className="left-part">
        <MenuElement title={<MenuIcon />}>
          <MenuItem
            sx={menuItemStyle}
            onClick={() => {
              setRoute(ROUTES.HOME_ROUTE);
            }}
          >
            Home
          </MenuItem>
          <MenuItem sx={menuItemStyle}>Movies</MenuItem>
          <MenuItem sx={menuItemStyle}>TvShows</MenuItem>
        </MenuElement>
        <h2
          onClick={() => {
            setRoute(ROUTES.HOME_ROUTE);
          }}
        >
          Movies
        </h2>
      </div>
      <div className="right-part">
        <div className="search-field">
          <Search className="search" onBlur={closeSearch}>
            <IconButton
              type="submit"
              size="large"
              aria-label="search"
              color="inherit"
              onClick={() => {
                setRoute(ROUTES.MULTI_SEARCH_PAGE_ROUTE, searchValue.value);
              }}
            >
              <SearchIcon />
            </IconButton>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
              onChange={getSearchItem}
              onKeyPress={checkEnter}
              value={searchValue.value}
            />
            {searchValue.show ? (
              <div className="search-items-wrapper">
                <ul className="search-items">
                  <li className="first">People</li>
                  {searchPeople.length > 0 ? (
                    searchPeople.map((itemPeople: IPerson) => (
                      <li key={itemPeople.id}>
                        <button type="button">{itemPeople.name}</button>
                      </li>
                    ))
                  ) : (
                    <li className="empty-search-list">nothing to show</li>
                  )}
                </ul>
                <ul className="search-items">
                  <li className="first">Movies</li>
                  {searchMovie.length > 0 ? (
                    searchMovie.map((itemMovie: IMovie) => (
                      <li key={itemMovie.id}>
                        <button type="button">{itemMovie.title}</button>
                      </li>
                    ))
                  ) : (
                    <li className="empty-search-list">nothing to show</li>
                  )}
                </ul>
                <ul className="search-items">
                  <li className="first">TvShow</li>
                  {searchTvShow.length > 0 ? (
                    searchTvShow.map((itemTvShow: ITvShow) => (
                      <li key={itemTvShow.id}>
                        <button type="button">{itemTvShow.name}</button>
                      </li>
                    ))
                  ) : (
                    <li className="empty-search-list">nothing to show</li>
                  )}
                </ul>
              </div>
            ) : null}
          </Search>
        </div>
        <div className="iconWrapper">
          <IconButton size="large" aria-label="search" color="inherit">
            <BookmarkBorderIcon className="icon" />
          </IconButton>
          <MenuElement title={<AccountCircleRoundedIcon className="icon" />}>
            <MenuItem sx={profileMenuItemStyle}>Profile</MenuItem>
            <MenuItem sx={profileMenuItemStyle}>SignIn</MenuItem>
            <MenuItem sx={profileMenuItemStyle}>SignUp</MenuItem>
            <MenuItem sx={profileMenuItemStyle}>LogOut</MenuItem>
          </MenuElement>
        </div>
      </div>
    </header>
  );
};
export default Header;
