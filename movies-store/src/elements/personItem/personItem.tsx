import React from 'react';
import { IPerson } from '../../interfaces';
import { IMAGE_URL, PERSON_PLACEHOLDER } from '../../variables';

/* eslint-disable*/
const PersonItem = ({ id, name, profile_path, known_for_department }: IPerson): JSX.Element => {
  return (
    
      <div key={id} className="result-item">
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
