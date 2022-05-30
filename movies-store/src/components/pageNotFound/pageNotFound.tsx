import React from 'react';
import './pageNotFound.scss';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../variables';

const PageNotFound = (): JSX.Element => {
  const history = useHistory();

  const goHome = () => {
    history.push({
      pathname: ROUTES.HOME_ROUTE,
      search: '',
    });
  };

  return (
    <section className=" content not-found">
      <h2>404</h2>
      <p>Page not found</p>
      <Button
        type="button"
        variant="contained"
        onClick={goHome}
        sx={{
          backgroundColor: '#ff6600',
          height: '45px',
          '&:hover': { backgroundColor: '#ff6600', color: '#1f1f1f' },
        }}
      >
        Go to HOME PAGE
      </Button>
    </section>
  );
};
export default PageNotFound;
