import React from 'react';
import { fireEvent, getByPlaceholderText, render } from '@testing-library/react';
import Header from '../header';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
// import { searchNewValue} from '../../../appAPI/api';

const mockStore = configureStore([]);

const store = mockStore({
  user: null,
});

// jest.mock('../../../appAPI/api.ts', () => ({
//     searchNewValue: jest.fn(),
// }));

describe('render Header', () => {
  it('should display expected headline', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(getByText('Movies')).not.toBeNull();
  });
  it('should display expected placeholder', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(getByPlaceholderText('Search...')).not.toBeNull();
  });

  it('should open left menu with Home menu item when menu was clicked ', () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    fireEvent.click(getByTestId('MenuIcon'));
    expect(getByText('Home')).not.toBeNull();
  });

  it('should open left menu with Movies menu item when menu was clicked ', () => {
    const { getAllByText, getByTestId } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    fireEvent.click(getByTestId('MenuIcon'));
    expect(getAllByText('Movies')).toHaveLength(2);
  });
  it('should open left menu with TvShows menu item when menu was clicked ', () => {
    const { getAllByText, getByTestId } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    fireEvent.click(getByTestId('MenuIcon'));
    expect(getAllByText('TvShows')).not.toBeNull();
  });
  it('should close left menu with on blur event ', () => {
    const { getAllByText, getByTestId } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    fireEvent.blur(getByTestId('MenuIcon'));
    expect(getAllByText('Movies')).toHaveLength(1);
  });
  it('should open right menu with SignIn menu item when menu was clicked when user signed out', () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    fireEvent.click(getByTestId('NoAccountsIcon'));
    expect(getByText('SignIn')).not.toBeNull();
  });
  it('should open right menu with SignUpn menu item when menu was clicked when user signed out', () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    fireEvent.click(getByTestId('NoAccountsIcon'));
    expect(getByText('SignUp')).not.toBeNull();
  });

  it('should open right menu with SignIn menu item when menu was clicked when user signed in', () => {
    const localStore = mockStore({
      user: {
        id: 1,
        username: 'name',
        password: 'qqq1',
        phone: '12345678914',
        token: 12,
        favorites: { movie: [], tvShow: [1399] },
      },
    });
    const { getByText, getByTestId } = render(
      <Provider store={localStore}>
        <Header />
      </Provider>
    );
    fireEvent.click(getByTestId('AccountCircleRoundedIcon'));
    expect(getByText('SignOut')).not.toBeNull();
  });
  it('should open right menu with Profile menu item when menu was clicked when user signed in', () => {
    const localStore = mockStore({
      user: {
        id: 1,
        username: 'name',
        password: 'qqq1',
        phone: '12345678914',
        token: 12,
        favorites: { movie: [], tvShow: [1399] },
      },
    });
    const { getByText, getByTestId } = render(
      <Provider store={localStore}>
        <Header />
      </Provider>
    );
    fireEvent.click(getByTestId('AccountCircleRoundedIcon'));
    expect(getByText('Profile')).not.toBeNull();
  });

  it('should close right menu on blur event', () => {
    const { getByRole, getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    fireEvent.click(getByTestId('NoAccountsIcon'));
    fireEvent.blur(getByRole('presentation'));
    expect(queryByTestId('rightMenuItem')).toBeNull();
  });

  it('should favorites icon  when user signed in and has favorites', () => {
    const localStore = mockStore({
      user: {
        id: 1,
        username: 'name',
        password: 'qqq1',
        phone: '12345678914',
        token: 12,
        favorites: { movie: [], tvShow: [1399] },
      },
    });
    const { getByTestId } = render(
      <Provider store={localStore}>
        <Header />
      </Provider>
    );
    expect(getByTestId('BookmarkIcon')).not.toBeNull();
  });
  it('should favorites icon  when user signed in and has no favorites', () => {
    const localStore = mockStore({
      user: {
        id: 1,
        username: 'name',
        password: 'qqq1',
        phone: '12345678914',
        token: 12,
        favorites: { movie: [], tvShow: [] },
      },
    });
    const { getByTestId } = render(
      <Provider store={localStore}>
        <Header />
      </Provider>
    );
    expect(getByTestId('BookmarkBorderIcon')).not.toBeNull();
  });

  // it('should show signIn modal when menu was clicked', () => {
  //   const { getByTestId, getByPlaceholderText } = render(
  //     <Provider store={store}>
  //       <Header />
  //     </Provider>
  //   );
  //   fireEvent.click(getByTestId('NoAccountsIcon'));
  //   expect(getByPlaceholderText('Username')).not.toBeNull();
  //   // expect(getByRole('menu')).toBeNull();
  // });
});
