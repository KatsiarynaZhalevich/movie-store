import React, { useState } from 'react';
import './readMore.scss';

type Props = {
  children: string;
};
const ReadMore = ({ children }: Props) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? children.slice(0, 350) : children}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? '...read more' : ' show less'}
      </span>
    </p>
  );
};

export default ReadMore;
