import React, { Component } from 'react';
import {
  array,
  string,
} from 'react-proptypes';
import cn from 'classnames';
import {
  AppBar,
  Dialog,
  DialogContent,
  DialogTitle,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  getMapImage,
  ZONE,
} from 'constants/map';

class MapEmbed extends Component {
  static propTypes = {
    zone: string.isRequired,
    points: array,
  };

  static defaultProps = {
    points: [],
  };

  state = {
    open: false,
    mouseX: 0,
    mouseY: 0,
    point: null,
  };

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  componentDidMount() {
    window.addEventListener('mousemove', this.updateCoords);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.updateCoords);
  }

  updateCoords = (event) => {
    if (!document.getElementById('map-dialog-container')) return;
    const bounds = document.getElementById('map-dialog-container').getBoundingClientRect();
    let x = event.clientX - bounds.left - .5;
    let y = event.clientY - bounds.top - .5;
    if (x < 0 || x > bounds.right - bounds.left + 1 || y < 0 || y > bounds.bottom - bounds.top + 1) {
      x = -1;
      y = -1;
    }
    this.setState({ mouseX: x, mouseY: y });
  };

  handleMouseOver = (point) => {
    this.setState({ point });
  };

  handleMouseOut = () => {
    this.setState({ point: null });
  };

  render() {
    const { zone, points } = this.props;
    const { open, point: hoverPoint, mouseX, mouseY } = this.state;

    const map = getMapImage(zone);

    return (
      <div className="map-embed">
        <div className="map-preview">
          <div className="map-left map-content">
            <img src={map} alt={zone} onClick={this.handleOpen} />
            {points.map((point, index) => point.coords.map((coord, id) => (
              <Tooltip
                key={`point-${zone}-${index}-${id}`}
                title={
                  <React.Fragment>
                    <Typography variant="caption" dangerouslySetInnerHTML={{
                      __html: Array.isArray(point.label) ? point.label.join('<br />') : point.label,
                    }} />
                  </React.Fragment>
                }
              >
                <div
                  className={cn('point', { 'hover-anim': hoverPoint === index })}
                  style={{ left: `calc(${coord.x}% - 12px)`, top: `calc(${coord.y - 3.4}% - 12px)` }}
                  data-point={point.icon || index + 1}
                />
              </Tooltip>),
            ))}
          </div>
          <div className="map-points">
            <AppBar position="static">
              <Toolbar
                variant="dense"
                style={(zone === ZONE.WESTERN_HIRAM_MOUNTAINS || zone === ZONE.EASTERN_HIRAM_MOUNTAINS)
                  ? { padding: '0 14px' } : {}}
              >
                <Typography variant="subtitle1" className="title-text">{zone}</Typography>
              </Toolbar>
            </AppBar>
            <div style={{ padding: '8px 0' }}>
              {points.map((point, index) => {
                let { label: labels } = point;
                if (!Array.isArray(labels)) {
                  labels = [labels];
                }
                return (
                  <React.Fragment key={`point-list-${zone}-${index}`}>
                    {labels.map((label, id) => (
                      <div
                        key={`point-list-${zone}-${index}-${id}`}
                        onMouseOver={() => this.handleMouseOver(index)}
                        onMouseOut={this.handleMouseOut}
                        className="point-item"
                      >
                        <Typography className="point-label">
                          <span className="point inline-point" data-point={point.icon || index + 1} />
                          {label}
                        </Typography>
                      </div>))}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          className="map-dialog"
          maxWidth="xl"
        >
          <DialogTitle>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="subtitle1" className="title-text">{zone}</Typography>
              </Toolbar>
            </AppBar>
          </DialogTitle>
          <DialogContent>
            <div className="map-content" id="map-dialog-container">
              <img src={map} alt={zone} />
              {points.map((point, index) => point.coords.map((coord, id) => (
                <Tooltip
                  key={`point-${zone}-${index}-${id}`}
                  title={
                    <React.Fragment>
                      <Typography variant="caption" dangerouslySetInnerHTML={{
                        __html: Array.isArray(point.label) ? point.label.join('<br />') : point.label,
                      }} />
                    </React.Fragment>
                  }
                >
                  <div
                    className={cn('point', { 'hover-anim': hoverPoint === index })}
                    style={{ left: `calc(${coord.x}% - 12px)`, top: `calc(${coord.y}% - 24px)` }}
                    data-point={point.icon || index + 1}
                  />
                </Tooltip>),
              ))}
            </div>
            <div className="point-list">
              {points.map((point, index) => {
                let { label: labels } = point;
                if (!Array.isArray(labels)) {
                  labels = [labels];
                }
                return (
                  <React.Fragment key={`embed-list-${zone}-${index}`}>
                    {labels.map((label, id) => (
                      <div
                        key={`embed-list-${zone}-${index}-${id}`}
                        onMouseOver={() => this.handleMouseOver(index)}
                        onMouseOut={this.handleMouseOut}
                        className="point-item"
                      >
                        <Typography className="point-label">
                          <span className="point inline-point" data-point={point.icon || index + 1} />
                          {label}
                        </Typography>
                      </div>))}
                  </React.Fragment>
                );
              })}
            </div>
            {__DEVELOPMENT__ &&
            <Typography>Cursor location: {mouseX === -1 || mouseY === -1 ? 'Out of bounds'
              : `${(Math.round(mouseX / 928 * 1000) / 10)}%, ${(Math.round(mouseY / 556 * 1000) / 10)}%`}</Typography>}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default MapEmbed;