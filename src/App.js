import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import img1 from './img1.png'; 
import img2 from './img2.png';
import AddGroup from './AddGroup';
import Note from './Note';

const App = () => {
  const [groups, setGroups] = useState(() => {
    const savedGroups = localStorage.getItem('groups');
    return savedGroups ? JSON.parse(savedGroups) : [];
  });
  
  const [selectedGroup, setSelectedGroup] = useState(null);

  const addGroup = (newGroup) => {
    setGroups((prevGroups) => {
      const updatedGroups = [...prevGroups, { ...newGroup, notes: [] }];
      localStorage.setItem('groups', JSON.stringify(updatedGroups));
      return updatedGroups;
    });
    setSelectedGroup(null);
  };

  const setGroupNotes = (updatedGroup) => {
    setGroups((prevGroups) => {
      const updatedGroups = prevGroups.map(group => 
        group.id === updatedGroup.id ? updatedGroup : group
      );
      localStorage.setItem('groups', JSON.stringify(updatedGroups));
      return updatedGroups;
    });
    setSelectedGroup(updatedGroup);
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
  };

  useEffect(() => {
  }, []);

  return (
    <div className='main-page'>
      <div className='sidebar'>
        <h1>Pocket Notes</h1>
        <div className="sidebar-content">
          <ul>
            {groups.map(group => (
              <li 
                key={group.id} 
                className={`group-item ${selectedGroup?.id === group.id ? 'active' : ''}`} 
                onClick={() => handleGroupClick(group)}
              >
                <span
                  className='group-circle'
                  style={{ backgroundColor: group.color }}
                >
                  {group.initials}
                </span>  
                {group.name}
              </li>
            ))}
          </ul>
        </div>
        <div className='NoteButton'>
          <Link to="/add-group">
            <button className='AddButton'>+</button>
          </Link>
        </div>
      </div>

      <div className='content'>
        <div className='content-wrapper'>
          {selectedGroup ? (
            <Note group={selectedGroup} setGroupNotes={setGroupNotes} />
          ) : (
            <div>
              <div className='img1'>
                <img src={img1} alt='img1' />
              </div>
              <h2>Pocket Notes</h2>
              <p>
                Send and receive messages without keeping your phone online.<br />
                Use Pocket Notes on up to 4 linked devices and 1 mobile  phone.
              </p>
              <p className='encryption'>
                <span className='enc' aria-label='lock'>
                  <img src={img2} alt='img2' className='img2' />
                </span> end-to-end encrypted
              </p>
            </div>
          )}
        </div>
      </div>

      <Routes>
        <Route path="/add-group" element={<AddGroup addGroup={addGroup} />} />
        <Route path="/" element={<Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
