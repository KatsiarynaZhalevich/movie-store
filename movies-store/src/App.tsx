import React, { Suspense } from 'react';
import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Home from './components/home/home';
import { ROUTES } from './variables';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchPage from './components/searchPage/searchPage';
import GlobalSearch from './components/globalSearch/globalSearch';

function App(): JSX.Element {
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
              <SearchPage />
            </Route>
            <Route exact path={ROUTES.MULTI_SEARCH_CATEGORY_PAGE_ROUTE}>
              <GlobalSearch />
            </Route>
          </Switch>
        </Suspense>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
