import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddGroup.css';

const AddGroup = ({ addGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [groupColor, setGroupColor] = useState('');
  const navigate = useNavigate();

  const handleGroupNameChange = (e) => setGroupName(e.target.value);
  const handleGroupColorChange = (color) => setGroupColor(color);

  const getInitials = (name) => {
    const words = name.trim().split(' ');
    let initials = '';
    
    if (words.length > 1) {
      initials = words[0][0] + words[1][0]; 
    } else {
      initials = words[0][0]; 
    }

    return initials.toUpperCase(); 
  };

  const handleSubmit = () => {
    if (groupName.trim()) {
      addGroup({
        id: Date.now(),
        name: groupName,
        initials: getInitials(groupName), 
        color: groupColor,
      });
      navigate('/');
    } else {
      alert('Please enter a group name');
    }
  };

  return (
    <div className='model1'>
      <div className='model2'>
        <h2>Create New Group</h2>

        <div className="input-group">
          <span>Group Name</span>
          <input 
            type="text"
            placeholder='Enter group name'
            value={groupName}
            onChange={handleGroupNameChange}
          />
        </div>

        <div className="color-select-group">
          <span>Choose Color</span>
          <div className="color-select">
            {['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'].map((color) => (
              <span
                key={color}
                className={`color-circle ${color === groupColor ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleGroupColorChange(color)}
              />
            ))}
          </div>
        </div>

        <div className="button-group">
          <button className='create-button' onClick={handleSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default AddGroup;
