import React from 'react';
import { useHistory } from 'react-router-dom';
import { IPerson } from '../../interfaces';
import { IMAGE_URL, PERSON_PLACEHOLDER, ROUTES } from '../../variables';

/* eslint-disable*/
const PersonItem = ({ id, name, profile_path, known_for_department }: IPerson): JSX.Element => {
  const history = useHistory();

  const goToPerson = () => {
    history.push({
      pathname: ROUTES.PERSON_ROUTE,
      search: `id=${id}`,
    });
  }
  return (
    
      <div key={id} className="result-item" onClick={goToPerson}>
        <div className="image-wrapper">
          <img src={profile_path ? `${IMAGE_URL}${profile_path}` : PERSON_PLACEHOLDER} alt={name} />
        </div>
        <div className="info">
          <h3>{name || "no name"}</h3>
          <p>{known_for_department}</p>
        </div>
      </div>
     
  );
};
export default PersonItem;
