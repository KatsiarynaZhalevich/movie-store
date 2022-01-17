import { Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React from 'react';
import './movies.scss';

const Movies = (): JSX.Element => {
  // const [movies, setMovies] = setState([]);
  const [value, setValue] = React.useState('Movies');
  const changeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <section className="content movies">
      <div className="left-part">
        <div className="sort">
          <h3>Sorting</h3>
        </div>
        <div className="filter">
          <h3>Filters</h3>
        </div>
      </div>
      <div className="right-part">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={changeTab} aria-label="lab API tabs example">
              <Tab label="Movies" value="Movies" />
              <Tab label="TvShow" value="TvShow" />
              <Tab label="People" value="People" />
            </TabList>
          </Box>
          <TabPanel value="Movies">
            <div>
              <p>Movies</p>
            </div>
          </TabPanel>
          <TabPanel value="TvShow">Item Two</TabPanel>
          <TabPanel value="People">Item Three</TabPanel>
        </TabContext>
      </div>
    </section>
  );
};
export default Movies;
