import React, { Component } from 'react';
import DiscordLogo from './Discord-Logo-White.svg';

class DiscordButton extends Component {
  render() {
    return (
      <a href="https://discord.gg/5acTKYu" className="discord-button" target="_blank">
        <div className="discord-icon">
          <img src={DiscordLogo} alt="" />
        </div>
        <p className="discord-text">
          Mokulu.io Discord
        </p>
      </a>
    );
  }
}

export default DiscordButton;
