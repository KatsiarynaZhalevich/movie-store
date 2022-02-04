import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { IUser } from '../../interfaces';
import getUser from '../../redux/selectors';
import { ROUTES } from '../../variables';

const ProtectedRoute: React.FC = ({ children }): JSX.Element => {
  const user: IUser | null = useSelector(getUser);
  if (!user) {
    return (
      <Redirect
        to={{
          pathname: ROUTES.HOME_ROUTE,
          search: '',
        }}
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
