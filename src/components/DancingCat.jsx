import { useState } from 'react';
import catImage from '../assets/images/cat.svg';
import '../styles/DancingCat.css';

const danceStyles = [
  { id: 'classic', name: '🕺 Classic', emoji: '🕺' },
  { id: 'disco', name: '🪩 Disco', emoji: '🪩' },
  { id: 'ballet', name: '🩰 Ballet', emoji: '🩰' },
  { id: 'breakdance', name: '🤸 Breakdance', emoji: '🤸' },
  { id: 'wiggle', name: '🐛 Wiggle', emoji: '🐛' },
  { id: 'jump', name: '🦘 Jump', emoji: '🦘' },
  { id: 'spin', name: '🌀 Spin', emoji: '🌀' },
];

function DancingCat() {
  const [isDancing, setIsDancing] = useState(false);
  const [danceStyle, setDanceStyle] = useState('classic');

  const toggleDance = () => {
    const newState = !isDancing;
    console.log('Toggle dance:', newState, 'Style:', danceStyle);
    setIsDancing(newState);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDance();
    }
  };

  const handleStyleChange = (styleId) => {
    setDanceStyle(styleId);
    // 스타일 변경 시 춤을 잠시 멈췄다가 다시 시작
    if (isDancing) {
      setIsDancing(false);
      setTimeout(() => setIsDancing(true), 100);
    }
  };

  return (
    <div className="dancing-cat-container">
      <h1>🎵 Dancing Cat 🎵</h1>

      <div className="cat-stage">
        <div
          className={`cat-wrapper ${isDancing ? `dancing-${danceStyle}` : ''}`}
          onClick={toggleDance}
          onKeyDown={handleKeyPress}
          tabIndex={0}
          role="button"
          aria-label={isDancing ? 'Stop dancing cat' : 'Start dancing cat'}
        >
          <img
            src={catImage}
            alt="Dancing Cat"
            className="cat-image"
          />
        </div>
        <p style={{ fontSize: '12px', color: 'white', marginTop: '10px' }}>
          Class: cat-wrapper {isDancing && `dancing-${danceStyle}`}
        </p>
      </div>

      <div className="style-selector">
        <label htmlFor="dance-style">Dance Style:</label>
        <div className="style-buttons">
          {danceStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => handleStyleChange(style.id)}
              className={`style-btn ${danceStyle === style.id ? 'selected' : ''}`}
              title={style.name}
            >
              {style.emoji}
            </button>
          ))}
        </div>
      </div>

      <div className="controls">
        <button
          onClick={toggleDance}
          className={isDancing ? 'active' : ''}
          aria-pressed={isDancing}
        >
          {isDancing ? '⏸️ Stop Dancing' : '▶️ Start Dancing'}
        </button>
      </div>

      <p className="instruction">
        {isDancing
          ? `${danceStyles.find(s => s.id === danceStyle)?.name} - Click to stop!`
          : 'Choose a style and click to dance!'}
      </p>
    </div>
  );
}

export default DancingCat;
