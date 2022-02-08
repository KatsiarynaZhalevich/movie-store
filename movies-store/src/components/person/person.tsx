import React, { useCallback, useEffect, useState } from 'react';
import { API_KEY, API_LINK, IMAGE_URL, PERSON_PLACEHOLDER } from '../../variables';
import { IMovie, IPerson, ITvShow } from '../../interfaces';
import './person.scss';
import { Box, CircularProgress, Tab } from '@mui/material';
import ReadMore from '../../elements/readMore/readMore';
import { TabContext, TabList, TabPanel } from '@mui/lab';

type Credits = {
  id: number;
  title: string;
  year: string;
  job?: string;
  vote_average: number;
  character?: string;
};
const Person = (): JSX.Element => {
  const id = new URLSearchParams(location.search).get('id');
  const [load, setLoad] = useState(false);
  const [person, setPerson] = useState<IPerson>({
    id: 0,
    name: '',
    birthday: '',
    deathday: '',
    biography: '',
    place_of_birth: '',
    profile_path: '',
    media_type: '',
    known_for_department: '',
    popularity: 0,
  });
  const [crewCredits, setCrewCredits] = useState<Credits[]>([]);
  const [movieCredits, setMovieCredits] = useState<Credits[]>([]);
  const [tvShowsCredits, setTvShowsCredits] = useState<Credits[]>([]);
  const [tab, setTab] = React.useState('1');

  const getPerson = useCallback(() => {
    setLoad(true);
    fetch(`${API_LINK}person/${id}${API_KEY}`)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          setPerson(response);
          setLoad(false);
        }
      });
  }, []);

  const getCredits = useCallback(() => {
    const crewCredits: Credits[] = [];
    const movCredits: Credits[] = [];
    const tvCredits: Credits[] = [];
    fetch(`${API_LINK}person/${id}/combined_credits${API_KEY}`)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          response.crew.map((item: any) => {
            const credit = {
              id: item.id,
              title: item.title || item.name,
              year: item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4),
              job: item.job,
              vote_average: item.vote_average,
            };
            crewCredits.push(credit);
          });
          response.cast.map((item: IMovie | ITvShow) => {
            const credit = {
              id: item.id,
              title: (item as IMovie).title || (item as ITvShow).name,
              year:
                (item as IMovie).release_date?.slice(0, 4) ||
                (item as ITvShow).first_air_date?.slice(0, 4),
              job: 'acting',
              character: item.character,
              vote_average: item.vote_average || 0,
            };
            if (item.media_type === 'movie') {
              movCredits.push(credit);
            } else {
              tvCredits.push(credit);
            }
          });
          setCrewCredits(crewCredits.sort((i: Credits, j: Credits) => +j.year - +i.year));
          setMovieCredits(movCredits.sort((i: Credits, j: Credits) => +j.year - +i.year));
          setTvShowsCredits(tvCredits.sort((i: Credits, j: Credits) => +j.year - +i.year));
        }
      });
  }, []);

  useEffect(() => {
    getPerson();
    getCredits();
  }, []);

  const tabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  if (load) {
    return <CircularProgress />;
  }
  return (
    <div className="page content">
      <div className="person-info ">
        <div className="top-info">
          <div className="person-image">
            <img
              src={person.profile_path ? `${IMAGE_URL}${person.profile_path}` : PERSON_PLACEHOLDER}
              alt={person.name}
            />
          </div>

          <div className="person-data">
            <h1>{person.name}</h1>
            <p>{person.known_for_department}</p>
            <p>
              <strong>Date of Birth:</strong> {person.birthday}
            </p>
            <p>
              <strong>Place of Birth:</strong> {person.place_of_birth}
            </p>
            {person.deathday ? (
              <p>
                <strong>Date of death:</strong> {person.deathday}
              </p>
            ) : null}
            <p>
              <strong>Popularity:</strong> {person.popularity}
            </p>
          </div>
        </div>
        <p>
          <strong>Biography:</strong>
        </p>
        <ReadMore>{person.biography || ''}</ReadMore>
        <div className="credits">
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={tabChange} aria-label="lab API tabs example">
                  <Tab label={`Movies(${movieCredits.length})`} value="1" />
                  <Tab label={`TvShows(${tvShowsCredits.length})`} value="2" />
                  <Tab label={`Crew(${crewCredits.length})`} value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                {movieCredits.length > 0 ? (
                  movieCredits.map((movie: Credits) => (
                    <div key={movie.id} className="credit-item">
                      <div className="credit-title">
                        <h4>
                          {movie.title} {movie.year ? `(${movie.year})` : ''}
                        </h4>
                        <p>{movie.vote_average}</p>
                      </div>
                      <p>{movie.character}</p>
                    </div>
                  ))
                ) : (
                  <p>nothing to show</p>
                )}
              </TabPanel>
              <TabPanel value="2">
                {tvShowsCredits.length > 0 ? (
                  tvShowsCredits.map((tvShow: Credits, index: number) => (
                    <div key={index} className="credit-item">
                      <div className="credit-title">
                        <h4>
                          {tvShow.title} {tvShow.year ? `(${tvShow.year})` : ''}
                        </h4>
                        <p>{tvShow.vote_average}</p>
                      </div>
                      <p>{tvShow.character}</p>
                    </div>
                  ))
                ) : (
                  <p>nothing to show</p>
                )}
              </TabPanel>
              <TabPanel value="3">
                {crewCredits.length > 0 ? (
                  crewCredits.map((crew: Credits) => (
                    <div key={crew.id} className="credit-item">
                      <div className="credit-title">
                        <h4>
                          {crew.title} {crew.year ? `(${crew.year})` : ''}
                        </h4>
                        <p>{crew.vote_average}</p>
                      </div>
                      <p>{crew.job}</p>
                    </div>
                  ))
                ) : (
                  <p>nothing to show</p>
                )}
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  );
};
export default Person;
