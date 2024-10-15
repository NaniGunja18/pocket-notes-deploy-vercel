import React, { useState } from 'react';
import './Note.css';
import img3 from './img3.png';
import img3Active from './img3Active.png';

const Note = ({ group, setGroupNotes }) => {
  const [noteText, setNoteText] = useState('');

  const handleAddNote = () => {
    if (noteText.trim()) {
      const currentTime = new Date().toLocaleString();
      const newNote = {
        text: noteText.trim(),
        time: currentTime,
      };

      const updatedGroup = {
        ...group,
        notes: [...group.notes, newNote],
      };

      setGroupNotes(updatedGroup);
      setNoteText('');
    }
  };

  return (
    <div className='note-container'>
      <div className='note-header'>
        <span className='group-initials'>{group.initials}</span>
        <h2>{group.name}</h2>
      </div>

      <div className='note-list'>
        {group.notes.length > 0 ? (
          <ul>
            {group.notes.map((note, index) => (
              <li key={index} className="note-item" style={{ padding: "10px", marginBottom: "10px", backgroundColor: "#FFFFFF", borderRadius: "8px", position: "relative" }}>
                <p style={{ whiteSpace: "pre-line" }}>{note.text}</p>
                <small style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  color: "#777"
                }}>{note.time}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p></p>
        )}
      </div>

      <div 
        className="note-input-background"
        style={{
          backgroundColor: "#001F8B",
          padding: "15px",
          borderRadius: "10px",
          position: "relative",
        }}
      >
        <textarea
          placeholder="Enter your text here............"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          className='note-textarea'
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "10px",
            padding: "15px",
            paddingRight: "60px",
            border: '1px solid #CCCCCC',
            width: "100%",
            resize: "none",
            minHeight: "150px",
            fontSize: "16px",
            color: "#333",
            boxSizing: "border-box",
          }}
        />
        <button 
          onClick={handleAddNote} 
          className='submit-btn'
          disabled={!noteText.trim()}
          style={{
            position: "absolute",
            bottom: '15px',
            right: '15px',
            color: noteText.trim() ? "#001F8B" : "#ccc",
            cursor: noteText.trim() ? "pointer" : "not-allowed",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "transparent",
            fontSize: "16px",
          }}
        >
          <img 
            src={noteText.trim() ? img3Active : img3}
            alt='Submit Button'
          />
        </button>
      </div>
    </div>
  );
};

export default Note;
