import React from 'react';
import Lock from './Lock'; // Adjust the import path as needed

const SidebarModule = ({ name, progress, currently_displayed, not_completed }) => {
  const moduleStyles = {
    padding: '10px 15px',
    margin: '5px 0',
    background: '#FFF',
    color: '#333',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    height: '80px', // Fixed height for uniformity
    display: 'flex', // Added for Flexbox layout
    flexDirection: 'column', // Stack children vertically
    justifyContent: 'center' // Center children vertically
  };

  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between', // Horizontally layout the header content
    alignItems: 'center', // Vertically center the header content
    width: '100%', // Take full width of the parent
  };

  const textLockContainer = {
    display: 'contents',
    alignItems: 'center', // Vertically centers the text and lock icon
  };

  const textStyles = {
    fontSize: '16px', // Consistent font size
  };

  const lockStyles = {
    height: '30px', // Consistent height for the lock icon
    marginLeft: '5px', // Space between text and lock icon
  };

  return (
    <div style={moduleStyles}>
      <div style={headerStyles}>
        <div style={textLockContainer}>
          <span style={{ ...textStyles, color: currently_displayed ? '#cf5e00' : 'black' }}>{name}</span>
          <div style={{height:'25px'}}>
            {not_completed && <Lock style={{ ...lockStyles, fill: 'black' }} className="my-custom-class" />}
          </div>
          
        </div>
      </div>
      <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '4px' }}>
        <div style={{ height: '100%', width: `${progress}%`, backgroundColor: '#cf5e00', borderRadius: 'inherit', transition: 'width 1s ease-in-out' }}></div>
      </div>
    </div>
  );
};

export default SidebarModule;
