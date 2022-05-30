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
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import './search.scss';
import { useHistory, useLocation } from 'react-router-dom';
import { API_KEY, API_LINK } from '../../variables';
import { IMovie, ITvShow, IGenre, ICountry } from '../../interfaces';
import MovieItem from '../../elements/movieItem/movieItem';
import TvShowItem from '../../elements/tvShowItem/tvShowItem';

type Year = {
  id: number;
  year: number;
};

type Result = {
  movie: IMovie[];
  tvShow: ITvShow[];
};
const countries: ICountry[] = [
  {
    id: 10,
    iso_3166_1: 'AU',
    name: 'Australia',
  },
  {
    id: 11,
    iso_3166_1: 'BE',
    name: 'Belgium',
  },
  {
    id: 12,
    iso_3166_1: 'BR',
    name: 'Brazil',
  },
  {
    id: 2,
    iso_3166_1: 'FR',
    name: 'France',
  },
  {
    id: 7,
    iso_3166_1: 'DE',
    name: 'Germany',
  },
  {
    id: 8,
    iso_3166_1: 'IT',
    name: 'Italy',
  },
  {
    id: 9,
    iso_3166_1: 'JP',
    name: 'Japan',
  },
  {
    id: 0,
    iso_3166_1: 'RU',
    name: 'Russia',
  },
  {
    id: 5,
    iso_3166_1: 'ES',
    name: 'Spain',
  },
  {
    id: 6,
    iso_3166_1: 'TR',
    name: 'Turkey',
  },
  {
    id: 4,
    iso_3166_1: 'GB',
    name: 'United Kingdom',
  },
  {
    id: 1,
    iso_3166_1: 'US',
    name: 'United States',
  },
  {
    id: 3,
    iso_3166_1: 'KR',
    name: 'South Korea',
  },
];
const Search = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const [mediaType, setMediaType] = useState(search.get('media_type'));
  const [country, setCountry] = useState(search.get('country') || '');
  const [year, setYear] = useState(search.get('year') || '');
  const [allYears, setAllYears] = useState<Year[]>([]); // /delete
  const [searchResult, setSearchResult] = useState<Result>({
    movie: [],
    tvShow: [],
  });
  const [allPages, setAllPages] = useState({
    all: 0,
    currentPage: 1,
  });
  const [allGenres, setAllGenres] = useState([]);
  const [genre, setGenre] = useState(search.get('genre') || '');
  const [popularity, setPopularity] = useState('desc');
  const [voteAverage, setVoteAverage] = useState('');
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

  // //////////             handle Changes         //////////////// //

  const changeMediaType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation('media_type', event.target.value);
    setMediaType(event.target.value);
    setGenre('');
    setCountry('');
    setYear('');
    history.replace({ search: `media_type=${event.target.value}` });
  };

  const changeGenre = (event: SelectChangeEvent<string>) => {
    setGenre(event.target.value);
    setLocation('genre', event.target.value);
  };
  const changeCountry = (event: SelectChangeEvent<string>) => {
    setCountry(event.target.value);
    setLocation('country', event.target.value);
  };
  const changeYear = (event: SelectChangeEvent<string>) => {
    setYear(event.target.value);
    setLocation('year', event.target.value);
  };
  const changePopularity = (event: SelectChangeEvent<string>) => {
    setPopularity(event.target.value);
    setVoteAverage('');
    setLocation('popularity', event.target.value);
  };
  const changeVoteAverage = (event: SelectChangeEvent<string>) => {
    setVoteAverage(event.target.value);
    setPopularity('');
    setLocation('vote_average', event.target.value);
  };

  const setLocation = (filter: string, value: string) => {
    const newSearch = new URLSearchParams(location.search);
    value === '' ? newSearch.delete(filter) : newSearch.set(filter, value);
    history.replace({ search: newSearch.toString() });
  };

  // //////////            end handle Changes         //////////////// //

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
    const type = mediaType === 'tvShow' ? 'tv' : mediaType;
    let link = `${API_LINK}discover/${type}${API_KEY}`;

    if (year) {
      switch (mediaType) {
        case 'movie':
          link += `&primary_release_year=${year}`;
          break;
        case 'tvShow':
          link += `&first_air_date_year=${year}`;
          break;
        default:
          break;
      }
    }
    link += `&page=${allPages.currentPage}`;
    if (genre) {
      link += `&with_genres=${genre}`;
    }
    if (country) {
      link += `&watch_region=${country}`;
    }
    if (popularity) {
      link += `&sort_by=popularity.${popularity}`;
    }
    if (voteAverage) {
      link += `&sort_by=vote_average.${voteAverage}`;
    }

    fetch(link)
      .then((response) => response.json())
      .then((response) => {
        setAllPages({ ...allPages, all: response.total_pages });
        switch (mediaType) {
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
    <div className="content search">
      <div className="left-part">
        <div className="sorting">
          <h3>Sorting</h3>
          <FormControl size="small">
            <InputLabel id="demo-controlled-open-select-label">Popularity</InputLabel>
            <Select
              sx={{
                color: '#1f1f1f',
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ff6600' },
              }}
              variant="outlined"
              label="Popularity"
              className="select"
              value={popularity}
              onChange={changePopularity}
            >
              <MenuItem value="" sx={{ height: '36px' }}>
                No sorting
              </MenuItem>
              <MenuItem value="ask">Asc</MenuItem>
              <MenuItem value="desc">Desc</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel id="Vote-average">Vote average</InputLabel>
            <Select
              sx={{
                color: '#1f1f1f',
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ff6600' },
              }}
              variant="outlined"
              label="Vote average"
              className="select"
              value={voteAverage}
              onChange={changeVoteAverage}
            >
              <MenuItem value="" sx={{ height: '36px' }}>
                No sorting
              </MenuItem>
              <MenuItem value="ask">Asc</MenuItem>
              <MenuItem value="desc">Desc</MenuItem>
            </Select>
          </FormControl>
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
                  label="TV show"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="movies-filters">
            <div className="filter">
              <FormControl size="small">
                <InputLabel id="genre">Genre</InputLabel>
                <Select
                  sx={{
                    color: '#1f1f1f',
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ff6600' },
                  }}
                  variant="outlined"
                  label="Genre"
                  className="select"
                  value={genre}
                  onChange={changeGenre}
                >
                  <MenuItem value="" sx={{ height: '36px' }}>
                    All
                  </MenuItem>
                  {allGenres.map((genre: IGenre) => (
                    <MenuItem key={genre.id} value={genre.id}>
                      {genre.name || 'All'}
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
                  className="select"
                  value={country}
                  onChange={changeCountry}
                >
                  <MenuItem value="" sx={{ height: '36px' }}>
                    All
                  </MenuItem>
                  {countries.map((country) => (
                    <MenuItem key={country.id} value={country.iso_3166_1}>
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
                  className="select"
                  value={year}
                  onChange={changeYear}
                >
                  <MenuItem value="" sx={{ height: '36px' }}>
                    All
                  </MenuItem>
                  {allYears.map((year: Year) => (
                    <MenuItem key={year.id} value={year.year}>
                      {year.year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="movies"></div>
        </div>
      </div>
      <div className="right-part">
        {mediaType === 'movie' ? (
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
            <p>no results</p>
          )
        ) : mediaType === 'tvShow' ? (
          searchResult.tvShow ? (
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
            <p>no results</p>
          )
        ) : null}
        {allPages.all ? (
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
export default Search;
