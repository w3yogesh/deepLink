import React from 'react';

function Header({ name, title }) {
  return (
    <div className="header">
      <h1>{name}</h1>
      <p>{title}</p>
    </div>
  );
}

export default Header;