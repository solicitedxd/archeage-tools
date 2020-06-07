import {
  AppBar,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  Zoom,
} from '@material-ui/core';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import AppsIcon from '@material-ui/icons/Apps';
import CancelIcon from '@material-ui/icons/Cancel';
import ListIcon from '@material-ui/icons/List';
import SearchIcon from '@material-ui/icons/Search';
import {
  setDisplayGrid,
  setOnlyObtainable,
} from 'actions/mounts';
import cn from 'classnames';
import SelectField from 'components/SelectField';
import SkillIcon from 'components/Skill/SkillIcon';
import {
  MOUNT_TYPE,
  OBTAIN_TYPES,
} from 'constants/mounts';
import MOUNT from 'data/mounts';
import NoPortrait from 'images/NoPortrait.png';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleValue } from 'utils/array';
import {
  pascalCase,
  setTitle,
  slug,
} from 'utils/string';
import * as Portrait from '../../images/mount';
import * as Icon from '../../images/mount/icon';
import MountViewer from './MountViewer';

const SPEED_TIERS = new Map();

class Mounts extends Component {
  state = {
    search: '',
    mountType: '',
    speed: '',
    obtainTypes: [],
    orderBy: 'speed',
    order: 'asc',
  };

  constructor(props) {
    super(props);
    SPEED_TIERS.set('', 'All');
    Array.from(new Set(MOUNT.map(m => m.speed))).sort(this.sort).forEach(speed => SPEED_TIERS.set(speed, `${speed} m/s`));
  }

  setSearch = (e) => {
    const { value: search } = e.target;
    this.setState({ search });
  };

  setType = (e, mountTypeKey) => {
    const mountType = MOUNT_TYPE[mountTypeKey] || '';
    this.setState({ mountType });
  };

  setSpeed = (e, speed) => {
    this.setState({ speed });
  };

  handleObtainChange = (value) => {
    const { obtainTypes: old } = this.state;
    const obtainTypes = [...old];
    toggleValue(obtainTypes, value);
    this.setState({ obtainTypes });
  };

  handleSort = (orderBy) => () => {
    const { orderBy: orderByO, order } = this.state;
    if (orderBy === orderByO) {
      this.setState({ order: (order === 'asc' ? 'desc' : 'asc') });
    } else {
      this.setState({ orderBy, order: 'asc' });
    }
  };

  sort = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };

  render() {
    const { search, mountType, obtainTypes, speed, order, orderBy } = this.state;
    const { match: { params: { mount } }, displayGrid, setDisplayGrid, onlyObtainable, setOnlyObtainable } = this.props;

    if (!mount) {
      setTitle('Mounts');
    }

    const mounts = MOUNT.filter(mount => {
      if (search.length > 2 && mount.name.toLowerCase().indexOf(search.toLowerCase()) === -1) {
        return false;
      }

      if (mountType && !mount.types.includes(mountType)) {
        return false;
      }

      if (obtainTypes.length && (!mount.obtainable || !mount.obtainable.some(r => obtainTypes.includes(r)))) {
        return false;
      }

      if (speed && mount.speed !== Number(speed)) {
        return false;
      }

      return !(onlyObtainable && (!mount.obtainable || mount.obtainable.length === 0));
    }).sort((a, b) => {
      if (displayGrid) {
        if (a.speed === b.speed) {
          return this.sort(a.name.toLowerCase(), b.name.toLowerCase());
        } else {
          return a.speed - b.speed;
        }
      } else {
        const f = orderBy === 'name' ? 'speed' : 'name';

        if (a[orderBy] === b[orderBy]) {
          return this.sort(a[f], b[f]);
        } else {
          let sort;
          if (orderBy === 'name') {
            sort = this.sort(a[orderBy].toLowerCase(), b[orderBy].toLowerCase());
          } else {
            sort = this.sort(a[orderBy], b[orderBy]);
          }
          return sort * (order !== 'asc' ? -1 : 1);
        }
      }
    });

    return (
      <>
        <Paper className="section">
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="subtitle1" className="title-text">Mounts</Typography>
              <Tabs
                value={Number(!displayGrid)}
                indicatorColor="secondary"
                onChange={(e, value) => setDisplayGrid(Boolean(!value))}
              >
                <Tooltip title="Grid View">
                  <Tab icon={<AppsIcon />} aria-label="grid" />
                </Tooltip>
                <Tooltip title="List View">
                  <Tab icon={<ListIcon />} aria-label="list" />
                </Tooltip>
              </Tabs>
            </Toolbar>
          </AppBar>
          <div className="mount-filters">
            <TextField
              label="Search"
              className="mount-search"
              value={search}
              onChange={this.setSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Clear">
                      <CancelIcon className="clear-input" onClick={() => this.setSearch({ target: { value: '' } })} />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
            <SelectField
              id="mount-type"
              label="Mount Type"
              value={mountType || 'All'}
              options={{ '': 'All', ...MOUNT_TYPE }}
              onChange={this.setType}
            />
            <SelectField
              id="mount-speed"
              label="Base Speed"
              value={SPEED_TIERS.get(speed) || 'All'}
              options={SPEED_TIERS}
              onChange={this.setSpeed}
              controlClassName="small"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={onlyObtainable}
                  onChange={(e, checked) => setOnlyObtainable(checked)}
                  color="primary"
                />
              }
              label="Obtainable Only"
            />
            <div className="filter-field">
              <InputLabel shrink style={{ marginBottom: 4 }}>Obtain By</InputLabel>
              <div className="filter-group reward grid">
                {OBTAIN_TYPES.sort().map(obtainBy => (
                  <Tooltip title={obtainBy} key={obtainBy}>
                    <Button
                      variant={obtainTypes.includes(obtainBy) ? 'contained' : 'outlined'}
                      className={cn({ selected: obtainTypes.includes(obtainBy) })}
                      onClick={() => this.handleObtainChange(obtainBy)}
                    >
                      <span className={cn('dropdown-icon', obtainBy)} />
                    </Button>
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>
        </Paper>
        {displayGrid ?
          <div className="section">
            <div className="mount-grid">
              {mounts.map(mount => (
                <Zoom in unmountOnExit key={mount.name}>
                  <Paper className="mount">
                    <Link to={`/mounts/${slug(mount.name)}`}>
                      <div className="portrait">
                        <img
                          src={Portrait[pascalCase(mount.name)] || NoPortrait}
                          alt={mount.name}
                        />
                        {mount.obtainable && mount.obtainable.length > 0 &&
                        <div className="obtainables">
                          {mount.obtainable.sort().map(obtainBy => (
                            <Tooltip title={obtainBy} key={`${pascalCase(mount.name)}-${obtainBy}`}>
                              <span className={cn('dropdown-icon', obtainBy)} />
                            </Tooltip>
                          ))}
                        </div>}
                        <Typography className="name">{mount.name}</Typography>
                        <Typography className="speed" variant="caption">{mount.speed} m/s</Typography>
                      </div>
                    </Link>
                  </Paper>
                </Zoom>
              ))}
            </div>
            {mounts.length === 0 &&
            <Paper>
              <Typography className="no-results">No mounts meet the criteria.</Typography>
            </Paper>}
          </div>
          :
          <Paper className="section mount-table">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'name'}
                      direction={order}
                      onClick={this.handleSort('name')}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'speed'}
                      direction={order}
                      onClick={this.handleSort('speed')}
                    >
                      Speed
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Skills</TableCell>
                  <TableCell>Obtain By</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mounts.map(mount => (
                  <TableRow key={mount.name} onClick={() => this.props.history.push(`/mounts/${slug(mount.name)}`)}>
                    <TableCell className="mount-icon">
                      {Icon[pascalCase(mount.name)] &&
                      <Tooltip
                        title={<img
                          src={Portrait[pascalCase(mount.name)] || NoPortrait}
                          alt={mount.name}
                          className="portrait-tooltip"
                        />}
                        placement="right"
                      >
                        <img src={Icon[pascalCase(mount.name)]} alt={mount.name} />
                      </Tooltip>}
                    </TableCell>
                    <TableCell>
                      {mount.name}
                    </TableCell>
                    <TableCell>
                      {mount.speed} m/s
                    </TableCell>
                    <TableCell>
                      <div className="mount-skills">
                        {mount.skills.map(skill => {
                          const id = Array.isArray(skill) ? skill[0] : null;
                          const name = !id ? skill : null;
                          return (
                            <SkillIcon key={id || name} skillset="Basic" id={id} name={name} className="size-sm" />
                          );
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      {mount.obtainable && mount.obtainable.sort().map(obtainBy => (
                        <Tooltip title={obtainBy} key={`${pascalCase(mount.name)}-${obtainBy}`}>
                          <span className={cn('dropdown-icon', obtainBy)} />
                        </Tooltip>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
                {mounts.length === 0 &&
                <TableRow className="no-results">
                  <TableCell colSpan="5" align="center">
                    No mounts meet the criteria.
                  </TableCell>
                </TableRow>}
              </TableBody>
            </Table>
          </Paper>
        }
        <MountViewer
          id={mount}
          onClose={() => this.props.history.push('/mounts')}
        />
      </>
    );
  }
}

const mapStateToProps = ({ mounts }) => ({
  ...mounts,
});

const mapDispatchToProps = {
  setDisplayGrid,
  setOnlyObtainable,
};

export default connect(mapStateToProps, mapDispatchToProps)(Mounts);
