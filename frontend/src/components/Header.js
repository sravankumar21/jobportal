import React from 'react';
// import close from './images/icon-remove.svg';

const Header = ({ keywords, removeKeywords, clearAll }) => {
  return (
    <div className="header-container">
      <ul>
        {keywords.map((key, id) => (
          <li key={id}>
            {key}
            <button className="close" onClick={() => removeKeywords(key)}>
              <img src={close} alt="" />
            </button>
          </li>
        ))}
        {keywords.length > 0 && (
          <li>
            <a href="" onClick={() => clearAll()}>
              Clear
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
