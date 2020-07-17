import React from 'react';
import DiscordLogo from './Discord-Logo-White.svg';

const DiscordButton = () => (
  <a href="https://discord.gg/5acTKYu" className="discord-button" target="_blank" rel="noreferrer">
    <div className="discord-icon">
      <img src={DiscordLogo} alt="" />
    </div>
    <p className="discord-text">
      Mokulu.io Discord
    </p>
  </a>
);

export default DiscordButton;
