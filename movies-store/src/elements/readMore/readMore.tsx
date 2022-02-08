import React, { useState } from 'react';
import './readMore.scss';

type Props = {
  children: string;
};
const ReadMore = ({ children }: Props) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 350) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? '...read more' : ' show less'}
      </span>
    </p>
  );
};

export default ReadMore;
