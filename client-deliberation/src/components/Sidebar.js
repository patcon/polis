import React from 'react';
import Module from './SidebarModule'; // Adjust the import path as needed

const Sidebar = ({ modules, onModuleClick }) => {  const sidebarStyles = {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    height: '100%',
    position: 'fixed',
    left: 0,
    top: 0,
    backgroundColor: '#cf5e00',
    color: '#FFF',
    padding: '10px',
    boxSizing: 'border-box',
    overflowY: 'auto' // In case of many modules
  };

  const headingStyles = {
    marginBottom: '20px',
    color: '#FFF'
  };

  return (
    <div style={sidebarStyles}>
      <h1 style={headingStyles}>Poll Tutorial</h1>
      {modules.map((module, index) => (
        <div key={index} onClick={() => onModuleClick(index, false)} style={{ cursor: 'pointer', margin: '10px 0', marginRight: '10px', marginLeft: '10px'}}>
          <Module name={module.name} progress={module.progress} currently_displayed={module.currently_displayed} not_completed={module.not_completed} />
        </div>
      ))}
    </div>
  );
};
export default Sidebar;
