import React, { useCallback, useEffect, useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Pagination,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from '@mui/material';
import './multiSearchCategory.scss';
import { useHistory, useLocation } from 'react-router-dom';
import { API_KEY, API_LINK } from '../../variables';
import { IMovie, ITvShow, IPerson, IGenre } from '../../interfaces';
import PersonItem from '../../elements/personItem/personItem';
import MovieItem from '../../elements/movieItem/movieItem';
import TvShowItem from '../../elements/tvShowItem/tvShowItem';

type Year = {
  id: number;
  year: number;
};

type Result = {
  people: IPerson[];
  movie: IMovie[];
  tvShow: ITvShow[];
};
const countries = [
  {
    id: 10,
    ISO_3166_1: 'AU',
    name: 'Australia',
  },
  {
    id: 11,
    ISO_3166_1: 'BE',
    name: 'Belgium',
  },
  {
    id: 12,
    ISO_3166_1: 'BR',
    name: 'Brazil',
  },
  {
    id: 2,
    ISO_3166_1: 'FR',
    name: 'France',
  },
  {
    id: 7,
    ISO_3166_1: 'DE',
    name: 'Germany',
  },
  {
    id: 8,
    ISO_3166_1: 'IT',
    name: 'Italy',
  },
  {
    id: 9,
    ISOo_3166_1: 'JP',
    name: 'Japan',
  },
  {
    id: 0,
    ISO_3166_1: 'RU',
    name: 'Russia',
  },
  {
    id: 5,
    ISO_3166_1: 'ES',
    name: 'Spain',
  },
  {
    id: 6,
    ISO_3166_1: 'TR',
    name: 'Turkey',
  },
  {
    id: 4,
    ISO_3166_1: 'GB',
    name: 'United Kingdom',
  },
  {
    id: 1,
    ISO_3166_1: 'US',
    name: 'United States',
  },
  {
    id: 3,
    ISO_3166_1: 'KR',
    name: 'South Korea',
  },
];
const MultiSearchCategory = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const [mediaType, setMediaType] = useState(search.get('media_type'));
  const [country, setCountry] = useState(search.get('country') || '');
  const [allYears, setAllYears] = useState<Year[]>([]);
  const [year, setYear] = useState(search.get('year') || '');
  const query = search.get('search') || '';
  const [searchResult, setSearchResult] = useState<Result>({
    people: [],
    movie: [],
    tvShow: [],
  });
  const [allPages, setAllPages] = useState({
    all: 1,
    currentPage: 1,
  });

  const [allGenres, setAllGenres] = useState([]);
  const [genre, setGenre] = useState(search.get('genre') || '');

  const getYears = () => {
    const yearsArr: Year[] = [];
    const currYear = new Date().getFullYear();
    for (let i = +currYear; i > 1979; i--) {
      yearsArr.push({
        id: i,
        year: i,
      });
    }
    return yearsArr;
  };

  const changeMediaType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation('media_type', event.target.value);
    setMediaType(event.target.value);
  };

  const changeGenre = (event: any) => {
    setGenre(event.target.value);
    setLocation('genre', event.target.value);
  };
  const changeCountry = (event: any) => {
    setCountry(event.target.value);
    setLocation('country', event.target.value);
  };
  const changeYear = (event: any) => {
    setYear(event.target.value);
    setLocation('year', event.target.value);
  };

  const setLocation = (filter: string, value: string) => {
    const newSearch = new URLSearchParams(location.search);
    value !== 'All' ? newSearch.set(filter, value) : newSearch.delete(filter);
    history.replace({ search: newSearch.toString() });
  };
  const getGenres = useCallback(() => {
    const type = mediaType === 'movie' ? 'movie' : mediaType === 'tvShow' ? 'tv' : '';
    fetch(`${API_LINK}genre/${type}/list${API_KEY}`)
      .then((response) => response.json())
      .then((response) => {
        setAllGenres(response.genres);
      });
  }, [mediaType]);

  useEffect(() => {
    getGenres();
  }, [mediaType]);

  useEffect(() => {
    setAllYears(getYears());
  }, []);

  const getData = useCallback(() => {
    let type = mediaType;
    type === 'tvShow' ? (type = 'tv') : type;
    let link = `${API_LINK}search/${type}${API_KEY}&query=${query}&page=${allPages.currentPage}`;
    if (country && country !== 'All') {
      link = link + `&region=${country}`;
    }
    if (year && year !== 'All') {
      switch (mediaType) {
        case 'movie':
          link = link + `&year=${year}`;
          break;
        case 'tvShow':
          link = link + `&first_air_date_year=${year}`;
          break;
        default:
          break;
      }
    }

    fetch(link)
      .then((response) => response.json())
      .then((response) => {
        setAllPages({ ...allPages, all: response.total_pages });
        switch (mediaType) {
          case 'person':
            setSearchResult({ ...searchResult, people: response.results });
            break;
          case 'movie':
            setSearchResult({ ...searchResult, movie: response.results });
            break;
          case 'tvShow':
            setSearchResult({ ...searchResult, tvShow: response.results });
            break;
          default:
            break;
        }
      });
  }, [location.search, allPages.currentPage]);

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, [location.search, allPages.currentPage]);

  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setAllPages({ ...allPages, currentPage: value });
  };
  return (
    <div className="content global-search">
      <div className="left-part">
        <div className="sorting">
          <h3>Sorting</h3>
        </div>
        <div className="filters">
          <h3>Filters</h3>
          <div className="filter">
            <FormControl component="fieldset">
              <FormLabel
                sx={{
                  color: '#1f1f1f',
                  '&.Mui-focused': { color: '#1f1f1f' },
                }}
                component="legend"
                className="filter-title"
              >
                Media type
              </FormLabel>
              <RadioGroup
                aria-label="media-type"
                name="radio-buttons-group"
                onChange={changeMediaType}
                defaultValue=""
              >
                <FormControlLabel
                  className="checkbox"
                  value="person"
                  checked={mediaType === 'person'}
                  control={
                    <Radio
                      sx={{
                        '&.Mui-checked': { color: '#ff6600' },
                        '&.MuiRadio-root ': { padding: '5px', paddingLeft: '9px' },
                      }}
                    />
                  }
                  label="person"
                />
                <FormControlLabel
                  className="checkbox"
                  value="movie"
                  checked={mediaType === 'movie'}
                  control={
                    <Radio
                      sx={{
                        '&.Mui-checked': { color: '#ff6600' },
                        '&.MuiRadio-root ': { padding: '5px', paddingLeft: '9px' },
                      }}
                    />
                  }
                  label="movie"
                />
                <FormControlLabel
                  className="checkbox"
                  value="tvShow"
                  checked={mediaType === 'tvShow'}
                  control={
                    <Radio
                      sx={{
                        '&.Mui-checked': { color: '#ff6600' },
                        '&.MuiRadio-root ': { padding: '5px', paddingLeft: '9px' },
                      }}
                    />
                  }
                  label="tvShow"
                />
              </RadioGroup>
            </FormControl>
          </div>

          {mediaType === 'person' ? (
            <div className="person-filters"></div>
          ) : (
            <div className="movies-filters">
              <div className="filter">
                <FormControl size="small">
                  <InputLabel id="demo-controlled-open-select-label">Genre</InputLabel>
                  <Select
                    sx={{
                      color: '#1f1f1f',
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ff6600' },
                    }}
                    variant="outlined"
                    label="Genre"
                    className="genres"
                    value={genre}
                    onChange={changeGenre}
                  >
                    <MenuItem value="All">All</MenuItem>
                    {allGenres.map((genre: IGenre) => (
                      <MenuItem key={genre.id} value={genre.name}>
                        {genre.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="filter">
                <FormControl size="small">
                  <InputLabel id="demo-controlled-open-select-label">Country</InputLabel>
                  <Select
                    sx={{
                      color: '#1f1f1f',
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ff6600',
                      },
                    }}
                    variant="outlined"
                    label="Country"
                    className="country"
                    value={country}
                    onChange={changeCountry}
                  >
                    <MenuItem value="All">All</MenuItem>
                    {countries.map((country) => (
                      <MenuItem key={country.id} value={country.name}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="filter">
                <FormControl size="small">
                  <InputLabel id="demo-controlled-open-select-label">Year</InputLabel>
                  <Select
                    sx={{
                      color: '#1f1f1f',
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ff6600',
                      },
                    }}
                    variant="outlined"
                    label="Year"
                    className="year"
                    value={year}
                    onChange={changeYear}
                  >
                    <MenuItem value="All">All</MenuItem>
                    {allYears.map((year: Year) => (
                      <MenuItem key={year.id} value={year.year}>
                        {year.year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          )}
          <div className="people"></div>
          <div className="movies"></div>
        </div>
      </div>
      <div className="right-part">
        <p>
          Search: <strong>{query}</strong>
        </p>
        {mediaType === 'person' ? (
          searchResult.people ? (
            searchResult.people.map((res: IPerson) => (
              <PersonItem
                key={res.id}
                id={res.id}
                name={res.name}
                profile_path={res.profile_path}
                known_for_department={res.known_for_department}
              />
            ))
          ) : (
            <p>
              no result: <strong> {query}</strong>
            </p>
          )
        ) : mediaType === 'movie' ? (
          searchResult.movie ? (
            searchResult.movie.map((res: IMovie) => (
              <MovieItem
                key={res.id}
                id={res.id}
                title={res.title}
                poster_path={res.poster_path}
                release_date={res.release_date}
                overview={res.overview}
              />
            ))
          ) : (
            <p>
              no result: <strong> {query}</strong>
            </p>
          )
        ) : searchResult.tvShow ? (
          searchResult.tvShow.map((res: ITvShow) => (
            <TvShowItem
              key={res.id}
              id={res.id}
              name={res.name}
              poster_path={res.poster_path}
              first_air_date={res.first_air_date}
              overview={res.overview}
              number_of_seasons={res.number_of_seasons}
            />
          ))
        ) : (
          <p>
            no result: <strong> {query}</strong>
          </p>
        )}
        {allPages.all != 1 ? (
          <Stack spacing={2} className="pagination">
            <Pagination
              count={allPages.all}
              page={allPages.currentPage}
              showFirstButton
              showLastButton
              onChange={changePage}
            />
          </Stack>
        ) : null}
      </div>
    </div>
  );
};
export default MultiSearchCategory;
