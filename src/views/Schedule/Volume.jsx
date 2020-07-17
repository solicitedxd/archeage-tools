import {
  IconButton,
  Popover,
  Slider,
  Tooltip,
  Typography,
} from '@material-ui/core';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { VOLUME_DEFAULT } from 'constants/schedule';
import React, { Component } from 'react';
import {
  func,
  number,
} from 'react-proptypes';
import { connect } from 'react-redux';

class Volume extends Component {
  static propTypes = {
    volume: number,
    setVolume: func.isRequired,
  };

  static defaultProps = {
    volume: VOLUME_DEFAULT,
  };

  menuRef = React.createRef();

  state = {
    menu: null,
    volume: VOLUME_DEFAULT,
  };

  componentDidMount() {
    const { volume } = this.props;

    if (volume) {
      this.setState({ volume });
    }
  }

  handleOpenMenu = () => {
    const { volume: _volume } = this.props;
    this.setState({ menu: this.menuRef.current, volume: _volume });
  };

  handleCloseMenu = () => {
    this.setState({ menu: null });
  };

  render() {
    const { volume: _volume, setVolume } = this.props;
    const { menu, volume } = this.state;

    return (
      <>
        <Tooltip title={`Volume: ${_volume}%`}>
          <IconButton
            size="small"
            onClick={this.handleOpenMenu}
            color="inherit"
            ref={this.menuRef}
          >
            <div>
              {_volume > 49 && <VolumeUpIcon />}
              {_volume < 50 && _volume > 0 && <VolumeDownIcon />}
              {_volume === 0 && <VolumeMuteIcon />}
            </div>
          </IconButton>
        </Tooltip>
        <Popover
          anchorEl={menu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          getContentAnchorEl={null}
          open={Boolean(menu)}
          onClose={this.handleCloseMenu}
        >
          <div className="volume-column">
            <VolumeUpIcon />
            <Slider
              defaultValue={volume}
              onChange={setVolume}
              min={0}
              max={100}
              step={1}
              orientation="vertical"
              className="vol-slider"
            />
            <VolumeDownIcon />
            <Typography variant="subtitle2">{_volume}%</Typography>
          </div>
        </Popover>
      </>
    );
  }
}

const mapStateToProps = ({ calendar: { volume } }) => ({
  volume,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Volume);
