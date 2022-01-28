import React, { Suspense } from 'react';
import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Home from './components/home/home';
import { ROUTES } from './variables';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MultiSearch from './components/multiSearch/multiSearch';
import MultiSearchCategory from './components/multiSearchCategory/multiSearchCategory';
import Search from './components/search/search';

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
              <MultiSearch />
            </Route>
            <Route exact path={ROUTES.MULTI_SEARCH_CATEGORY_PAGE_ROUTE}>
              <MultiSearchCategory />
            </Route>
            <Route exact path={ROUTES.SEARCH_PAGE_ROUTE}>
              <Search />
            </Route>
          </Switch>
        </Suspense>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
