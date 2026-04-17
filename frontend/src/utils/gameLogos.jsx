import React, { useState } from 'react';

export const GAME_LOGOS = {
  'BGMI': 'https://upload.wikimedia.org/wikipedia/en/2/2f/Battlegrounds_Mobile_India_logo.png',
  'Valorant': 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Valorant_logo_-_pink_color_version.svg',
  'Free Fire Max': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Free_Fire_logo.svg/512px-Free_Fire_logo.svg.png',
  'CS2': 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Counter-Strike_2_text_logo.svg',
  'MLBB': 'https://upload.wikimedia.org/wikipedia/en/thumb/8/85/Mobile_Legends_Bang_Bang_logo.png/512px-Mobile_Legends_Bang_Bang_logo.png',
  'Tekken 8': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Tekken_8_Logo.webp/512px-Tekken_8_Logo.webp.png',
  'Pokemon Unite': 'https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Pok%C3%A9mon_Unite_logo.png/512px-Pok%C3%A9mon_Unite_logo.png',
  'Call of Duty Mobile': 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Call_of_Duty_Mobile_logo.png/512px-Call_of_Duty_Mobile_logo.png',
  'Clash Royale': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Clash_Royale_logo.png/512px-Clash_Royale_logo.png'
};

export const GameIcon = ({ game, size = 24, className = '', style = {} }) => {
  const [error, setError] = useState(false);
  const url = GAME_LOGOS[game];

  if (url && !error) {
    return (
      <img 
        src={url} 
        alt={game} 
        className={className}
        style={{ width: size, height: size, objectFit: 'contain', filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.5))', ...style }} 
        onError={() => setError(true)}
      />
    );
  }

  // Fallback
  return (
    <div className={className} style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', fontSize: size * 0.4, fontWeight: 900, fontFamily: 'Orbitron', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', ...style }}>
      {game ? game.substring(0, 2).toUpperCase() : 'G'}
    </div>
  );
};
