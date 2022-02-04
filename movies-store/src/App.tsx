import React, { Suspense, useEffect, useState } from 'react';
import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Home from './components/home/home';
import Profile from './components/profile/profile';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import { ROUTES } from './variables';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MultiSearch from './components/multiSearch/multiSearch';
import MultiSearchCategory from './components/multiSearchCategory/multiSearchCategory';
import Search from './components/search/search';
import { useDispatch } from 'react-redux';
import { authAction } from './redux/actions';
import { CircularProgress } from '@mui/material';

function App(): JSX.Element {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem('token') || '{}');
    if (JSON.stringify(token) !== '{}') {
      setLoading(true);
      fetch('http://localhost:8081/api/auth/getUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
        .then((response) => response.json())
        .then((response) => {
          dispatch(authAction(response));
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <div className="App">
      <Router>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path={ROUTES.HOME_ROUTE}>
              <Home />
            </Route>
            <Route exact path={ROUTES.MULTI_SEARCH_PAGE_ROUTE}>
              <MultiSearch />
            </Route>
            <Route exact path={ROUTES.MULTI_SEARCH_CATEGORY_PAGE_ROUTE}>
              <MultiSearchCategory />
            </Route>
            <Route exact path={ROUTES.SEARCH_PAGE_ROUTE}>
              <Search />
            </Route>
            <Route exact path={ROUTES.PROFILE_PAGE}>
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </Route>
          </Switch>
        </Suspense>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
