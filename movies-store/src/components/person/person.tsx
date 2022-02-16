import React, { useCallback, useEffect, useState } from 'react';
import {
  API_KEY,
  API_LINK,
  IMAGE_URL,
  PERSON_PLACEHOLDER,
  PROGRESS_STYLE,
  ROUTES,
} from '../../variables';
import { ICredits, IMovie, IPerson, ITvShow } from '../../interfaces';
import './person.scss';
import { Box, CircularProgress, Tab } from '@mui/material';
import ReadMore from '../../elements/readMore/readMore';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Redirect, useHistory, useLocation } from 'react-router-dom';

const Person = (): JSX.Element => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get('id');
  const [load, setLoad] = useState(false);
  const [loadCredits, setLoadCredits] = useState(false);
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
  const [crewCredits, setCrewCredits] = useState<ICredits[]>([]);
  const [movieCredits, setMovieCredits] = useState<ICredits[]>([]);
  const [tvShowsCredits, setTvShowsCredits] = useState<ICredits[]>([]);
  const [tab, setTab] = React.useState('1');
  const history = useHistory();

  if (!id) {
    return (
      <Redirect
        to={{
          pathname: ROUTES.PAGE_NOT_FOUND,
          search: '',
        }}
      />
    );
  }

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
  }, [location.search]);

  const getCredits = useCallback(() => {
    setLoadCredits(true);
    const crewArr: ICredits[] = [];
    const movieArr: ICredits[] = [];
    const tvArr: ICredits[] = [];
    fetch(`${API_LINK}person/${id}/combined_credits${API_KEY}`)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          response.crew.map((item: IMovie | ITvShow) => {
            const credit = {
              id: item.id,
              title: (item as IMovie).title || (item as ITvShow).name,
              year:
                +(item as IMovie).release_date?.slice(0, 4) ||
                +(item as ITvShow).first_air_date?.slice(0, 4),
              job: item.job,
              vote_average: item.vote_average || 0,
              media_type: item.media_type || '',
            };
            crewArr.push(credit);
          });
          response.cast.map((item: IMovie | ITvShow) => {
            const credit = {
              id: item.id,
              title: (item as IMovie).title || (item as ITvShow).name,
              year:
                +(item as IMovie).release_date?.slice(0, 4) ||
                +(item as ITvShow).first_air_date?.slice(0, 4),
              job: 'acting',
              character: item.character,
              vote_average: item.vote_average || 0,
              media_type: item.media_type || '',
            };
            if (item.media_type === 'movie') {
              movieArr.push(credit);
            } else {
              tvArr.push(credit);
            }
          });
          setCrewCredits(sortCredits(crewArr));
          setMovieCredits(sortCredits(movieArr));
          setTvShowsCredits(sortCredits(tvArr));
        }
      });
  }, [location.search]);

  const sortCredits = (credits: ICredits[]) => {
    return credits.sort((i: ICredits, j: ICredits) => {
      if (!isFinite(i.year) && !isFinite(j.year)) {
        return 0;
      }
      if (!isFinite(i.year)) {
        return 1;
      }
      if (!isFinite(j.year)) {
        return -1;
      }
      return j.year - i.year;
    });
  };

  useEffect(() => {
    getPerson();
    getCredits();
  }, [location.search]);

  const tabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const setRoute = (id: number, mediaType: string) => {
    history.push({
      pathname: ROUTES.MOVIE_PAGE,
      search: `media_type=${mediaType}&id=${id}`,
    });
  };

  if (load) {
    return (
      <div className="content">
        <CircularProgress sx={PROGRESS_STYLE} />
      </div>
    );
  }

  return (
    <div className="page content">
      <div className="person-info ">
        <div className="top-info">
          <div className="image">
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
        {person.biography ? (
          <>
            <p>
              <strong>Biography:</strong>
            </p>
            <ReadMore>{person.biography || ''}</ReadMore>
          </>
        ) : null}
        <div className="credits">
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  sx={{ '& .MuiTabs-indicator': { backgroundColor: '#ff6600' } }}
                  onChange={tabChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    sx={{ '&.Mui-selected': { color: '#ff6600' } }}
                    label={`Movies (${movieCredits.length})`}
                    value="1"
                  />
                  <Tab
                    sx={{ '&.Mui-selected': { color: '#ff6600' } }}
                    label={`TvShows (${tvShowsCredits.length})`}
                    value="2"
                  />
                  <Tab
                    sx={{ '&.Mui-selected': { color: '#ff6600' } }}
                    label={`Crew (${crewCredits.length})`}
                    value="3"
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                {movieCredits.length > 0 ? (
                  movieCredits.map((movie: ICredits) => (
                    <div
                      key={movie.id}
                      className="credit-item"
                      onClick={() => setRoute(movie.id, movie.media_type)}
                    >
                      <div className="credit-title">
                        <h4>
                          {movie.title} {movie.year ? `(${movie.year})` : ''}
                        </h4>
                        <p>{movie.vote_average}</p>
                      </div>
                      <p>{movie.character}</p>
                    </div>
                  ))
                ) : loadCredits ? (
                  <div className="credits-spinner">
                    <CircularProgress sx={PROGRESS_STYLE} />
                  </div>
                ) : (
                  <p>nothing to show</p>
                )}
              </TabPanel>
              <TabPanel value="2">
                {tvShowsCredits.length > 0 ? (
                  tvShowsCredits.map((tvShow: ICredits, index: number) => (
                    <div
                      key={index}
                      className="credit-item"
                      onClick={() => setRoute(tvShow.id, tvShow.media_type)}
                    >
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
                  crewCredits.map((crew: ICredits, index: number) => (
                    <div
                      key={index}
                      className="credit-item"
                      onClick={() => setRoute(crew.id, crew.media_type)}
                    >
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
