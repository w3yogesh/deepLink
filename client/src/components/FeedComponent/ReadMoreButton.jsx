import React, { useState } from 'react';

const ReadMoreButton = ({ text, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <div>
{ (text.length < maxLength) ? (
    <span>{text}</span>
  ) : (
    <>
      {isTruncated ? (
        <>
          {text.slice(0, maxLength)}
          <span>...</span>
          <span onClick={toggleTruncate}>
        <a>{isTruncated ? ' Read More' : ' Show Less'}</a>
      </span>
        </>
      ) : (
        <>
        <span>{text}</span>
        <span onClick={toggleTruncate}>
        <a>{isTruncated ? ' Read More' : ' Show Less'}</a>
      </span>
        </>
      )}
      
    </>
  )
}


      
      
      
    </div>
  );
};

export default ReadMoreButton;
