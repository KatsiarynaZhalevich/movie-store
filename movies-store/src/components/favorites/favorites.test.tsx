import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Favorites from './favorites';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { getMovies, getTvShows } from '../../appAPI/api';

const mockStore = configureStore([]);

const store = mockStore({
  user: null,
});

jest.mock('../../appAPI/api.ts', () => ({
  getMovies: jest.fn(),
  getTvShows: jest.fn(),
}));

// const getMckedUser = jest.fn().mockResolvedValue(userStub());
// const getMckedUser = jest.fn().mockResolvedValue(updateUserStub({name: 'Sasha'}));

// function userStub() {
//   return {
//     id: 1,
//     name: 'Kate',
//   };
// }

// function updateUserStub(data) {
//   return {...userStub(), ...data}
// }

describe('render favorites page', () => {
  it('check initial state without movie or tvShow', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Favorites />
      </Provider>
    );

    expect(getByText('Favorites list is empty')).not.toBeNull();
  });

  it('should render spinner when data is loading', async () => {
    const localStore = mockStore({
      user: {
        favorites: {
          movie: [],
          tvShow: [],
        },
      },
    });

    const { getByTestId } = render(
      <Provider store={localStore}>
        <Favorites />
      </Provider>
    );

    expect(getByTestId('spinner')).not.toBeNull();
  });

  it('should render expected headline when user has only favorite movies', async () => {
    (getMovies as jest.Mock).mockResolvedValueOnce([]);
    (getTvShows as jest.Mock).mockResolvedValueOnce([]);
    const localStore = mockStore({
      user: {
        id: 1,
        username: 'name',
        password: 'qqq1',
        phone: '12345678914',
        token: 12,
        favorites: { movie: [1966], tvShow: [] },
      },
    });

    const { getByText } = render(
      <Provider store={localStore}>
        <Favorites />
      </Provider>
    );
    // await waitFor(() => expect(getMovies).toHaveBeenCalledTimes(1));
    // expect(getMovies).toBeCalledWith([1966], 'movie');

    await waitFor(() => getByText('My favorites'));
    expect(getByText('My favorites')).not.toBeNull();
  });

  it('should render expected headline when user has only favorite tvShows', async () => {
    (getMovies as jest.Mock).mockResolvedValueOnce([]);
    (getTvShows as jest.Mock).mockResolvedValueOnce([]);
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

    const { getByText } = render(
      <Provider store={localStore}>
        <Favorites />
      </Provider>
    );

    await waitFor(() => getByText('My favorites'));
    expect(getByText('My favorites')).not.toBeNull();
  });

  it('should be called getMovies with expected data', () => {
    (getMovies as jest.Mock).mockResolvedValueOnce([]);
    (getTvShows as jest.Mock).mockResolvedValueOnce([]);
    const localStore = mockStore({
      user: {
        id: 1,
        username: 'name',
        password: 'qqq1',
        phone: '12345678914',
        token: 12,
        favorites: { movie: [1966], tvShow: [] },
      },
    });

    render(
      <Provider store={localStore}>
        <Favorites />
      </Provider>
    );
    expect(getMovies).toBeCalledWith([1966], 'movie');
  });

  it('should be called getTvShows with expected data', async () => {
    (getMovies as jest.Mock).mockResolvedValueOnce([]);
    (getTvShows as jest.Mock).mockResolvedValueOnce([]);
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

    const { getByText } = render(
      <Provider store={localStore}>
        <Favorites />
      </Provider>
    );
    await waitFor(() => getByText('My favorites'));
    expect(getTvShows).toBeCalledWith([1399], 'tv');
  });

  it('should render expected movie shows name', async () => {
    (getMovies as jest.Mock).mockResolvedValueOnce([
      {
        title: 'Alexander',
        year: 2004,
        overview: 'Alexander, the King of Macedoniaersians',
      },
    ]);
    (getTvShows as jest.Mock).mockResolvedValueOnce([]);
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

    const { getByText } = render(
      <Provider store={localStore}>
        <Favorites />
      </Provider>
    );
    await waitFor(() => getByText('My favorites'));
    expect(getByText('Alexander')).not.toBeNull();
  });

  it('should render expected movie shows overview', async () => {
    (getMovies as jest.Mock).mockResolvedValueOnce([
      {
        title: 'Alexander',
        year: 2004,
        overview: 'Alexander, the King of Macedoniaersians',
      },
    ]);
    (getTvShows as jest.Mock).mockResolvedValueOnce([]);
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

    const { getByText } = render(
      <Provider store={localStore}>
        <Favorites />
      </Provider>
    );
    await waitFor(() => getByText('My favorites'));
    expect(getByText('Alexander, the King of Macedoniaersians')).not.toBeNull();
  });

  it('should render expected tvShows has attribute aria-selected is true', async () => {
    (getMovies as jest.Mock).mockResolvedValueOnce([]);
    (getTvShows as jest.Mock).mockResolvedValueOnce([
      {
        name: 'Game of Thrones',
        overview: 'Seven noble families fight for control',
      },
    ]);
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

    const { getByText } = render(
      <Provider store={localStore}>
        <Favorites />
      </Provider>
    );
    await waitFor(() => getByText('My favorites'));
    expect(getByText('TvShows (1)')).toHaveAttribute('aria-selected', 'false');
    fireEvent.click(getByText('TvShows (1)'));
    expect(getByText('TvShows (1)')).toHaveAttribute('aria-selected', 'true');
    fireEvent.click(getByText('Movies (0)'));
    expect(getByText('TvShows (1)')).toHaveAttribute('aria-selected', 'false');
  });

  it('should render expected tvShow shows name', async () => {
    (getMovies as jest.Mock).mockResolvedValueOnce([]);
    (getTvShows as jest.Mock).mockResolvedValueOnce([
      {
        name: 'Game of Thrones',
        overview: 'Seven noble families fight for control',
      },
    ]);
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

    const { getByText } = render(
      <Provider store={localStore}>
        <Favorites />
      </Provider>
    );
    await waitFor(() => getByText('My favorites'));
    fireEvent.click(getByText('TvShows (1)'));
    expect(getByText('Game of Thrones')).not.toBeNull();
  });

  it('should render expected tvShow shows overview', async () => {
    (getMovies as jest.Mock).mockResolvedValueOnce([]);
    (getTvShows as jest.Mock).mockResolvedValueOnce([
      {
        name: 'Game of Thrones',
        overview: 'Seven noble families fight for control',
      },
    ]);
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

    const { getByText } = render(
      <Provider store={localStore}>
        <Favorites />
      </Provider>
    );
    await waitFor(() => getByText('My favorites'));
    fireEvent.click(getByText('TvShows (1)'));
    expect(getByText('Seven noble families fight for control')).not.toBeNull();
  });
});
