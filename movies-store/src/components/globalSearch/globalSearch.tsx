import React, { useCallback, useEffect, useState } from 'react';
import { FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';
import './globalSearch.scss';
import { useHistory } from 'react-router-dom';
import { API_KEY, API_LINK } from '../../variables';
import { IGenre } from '../../interfaces';

const GlobalSearch = (): JSX.Element => {
  const search = new URLSearchParams(location.search);
  const history = useHistory();
  const [mediaType, setMediaType] = useState(search.get('media_type'));
  const [allGenres, setAllGenres] = useState([]);
  const [genre, setGenre] = useState("");
  const changeMediaType = (event: any) => {
    const newSearch = new URLSearchParams(location.search);
    newSearch.set('media_type', event.target.value);
    history.replace({ search: newSearch.toString() });
    setMediaType(newSearch.get('media_type'));
  };

  const getGenres = useCallback(async() => {
    await fetch(`${API_LINK}genre/movie/list${API_KEY}`)
      .then((response) => response.json())
      .then((response) => {
        setAllGenres(response.genres);
      });
  }, []);

  const changeGenre = (event: any) => {
    setGenre(event.target.value as string);
  };

  useEffect(() => {
    getGenres();
  }, []);
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
          <div className="filter">
            <FormControl size="small" >
            <InputLabel id="demo-controlled-open-select-label" >Genre</InputLabel>
              <Select
                sx={{ 
                  color: '#1f1f1f',
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ff6600' },}}
                variant='outlined'
                label="Genre"
                className="genres"
                value={genre}
                onChange={changeGenre}
              >
              {allGenres.map((genre: IGenre) => (
              <MenuItem key={genre.id} value={genre.name} className='item-genre'>
                {genre.name}
              </MenuItem>
            ))}
              </Select>
            </FormControl>
          </div>
          {mediaType === 'person' ? (
            <div className="person-filters"></div>
          ) : (
            <div className="movies-filters"></div>
          )}
          <div className="people"></div>
          <div className="movies"></div>
        </div>
      </div>
      <div className="right-part">123</div>
    </div>
  );
};
export default GlobalSearch;
// https://developers.themoviedb.org/3/genres/get-movie-list
