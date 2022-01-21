import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import './globalSearch.scss';

const GlobalSearch = (): JSX.Element => {
  const search = new URLSearchParams(location.search);
  const mediaType = search.get('media_type');
  console.log(mediaType);

  // const getPeopleDepartment () => {

  // }
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
              <RadioGroup aria-label="gender" defaultValue="female" name="radio-buttons-group">
                <FormControlLabel
                  className="checkbox"
                  value="person"
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