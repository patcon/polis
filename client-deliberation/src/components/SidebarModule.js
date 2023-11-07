import React from 'react';
import Lock from './Lock';// Adjust the import path as needed


const SidebarModule = ({ name, progress, currently_displayed, not_completed }) => {
  const moduleStyles = {
    padding: '10px 15px',
    margin: '5px 0',
    background: '#FFF',
    color: '#333',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const fillerStyles = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: '#F4511E',
    borderRadius: 'inherit',
    transition: 'width 1s ease-in-out'
  };

  console.log("name ", name, "currently ", currently_displayed)

  return (
    <div style={moduleStyles}>
      <div style={{ marginBottom: '5px', color: currently_displayed ? '#F4511E' : 'black'}}>{name} 
      {' '}
     {not_completed &&  <Lock style={{ fill: 'black' }} className="my-custom-class" />}
      </div>
      <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '4px' }}>
        <div style={fillerStyles}></div>
      </div>
    </div>
  );
};

export default SidebarModule;
