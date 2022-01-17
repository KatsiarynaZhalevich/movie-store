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
import { API_KEY, API_LINK } from '../../variables';
import { IMovie, IPerson, ITvShow } from '../../interfaces';

// START SEARCH SETTINGS
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
// END SEARCH SETTINGS

const Header = (): JSX.Element => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchMovie, setSearchMovie] = useState([]);
  const [searchTvShow, setSearchTvShow] = useState([]);
  const [searchPeople, setSearchPeople] = useState([]);

  const getSearchItem = (search: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = search.target.value;
    // setSearchList([]);
    if (newSearch.length >= 3) {
      try {
        fetch(
          `${API_LINK}search/multi${API_KEY}&language=en-US&query=${newSearch}&page=1&include_adult=false`
        )
          .then((response) => response.json())
          .then((response) => {
            setSearchMovie(
              response.results
                .filter((searchItem: IMovie) => searchItem.media_type === 'movie')
                .slice(0, 5)
            );
            setSearchTvShow(
              response.results
                .filter((searchItem: ITvShow) => searchItem.media_type === 'tv')
                .slice(0, 5)
            );
            setSearchPeople(
              response.results
                .filter((searchItem: IPerson) => searchItem.media_type === 'person')
                .slice(0, 5)
            );
            setShowSearch(true);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      setShowSearch(false);
    }
  };
  const closeSearch = () => {
    setShowSearch(false);
  };

  console.log('tv', searchTvShow);
  return (
    <header className="header">
      <div className="left-part">
        <MenuElement title={<MenuIcon />}>
          <MenuItem sx={menuItemStyle}>Home</MenuItem>
          <MenuItem sx={menuItemStyle}>All</MenuItem>
          <MenuItem sx={menuItemStyle}>Movies</MenuItem>
          <MenuItem sx={menuItemStyle}>Series</MenuItem>
        </MenuElement>
        <h2>Movies</h2>
      </div>
      <div className="right-part">
        <Search className="search">
          <IconButton size="large" aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={getSearchItem}
            onBlur={closeSearch}
            // value={searchValue}
          />
          {showSearch ? (
            <div className="search-items-wrapper">
              <ul className="search-items">
                <li className="first">People</li>
                {searchPeople.length > 0 ? (
                  searchPeople.map((itemPeople: IPerson) => (
                    <li key={itemPeople.personId}>
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
