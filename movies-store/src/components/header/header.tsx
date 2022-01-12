import React from 'react';
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

const Header = (): JSX.Element => {
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
        <Search>
          <IconButton size="large" aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>
          <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
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
