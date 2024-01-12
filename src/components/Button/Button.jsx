import React from 'react';

const Button = ({ icon, text, onClick, className }) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {text && <p className="button__text">{text}</p>}
      {icon}
    </button>
  );
};

export default Button;
