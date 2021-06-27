import {
  AppBar,
  Button,
  ButtonGroup,
  Checkbox,
  CircularProgress,
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
import { fetchMounts } from 'actions/gameData';
import {
  setDisplayGrid,
  setOnlyObtainable,
} from 'actions/mounts';
import cn from 'classnames';
import AdContainer from 'components/AdContainer';
import SelectField from 'components/SelectField';
import SkillIcon from 'components/Skill/SkillIcon';
import MOUNT_OBTAIN from 'data/mounts';
import NoPortrait from 'images/NoPortrait.png';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  bool,
  func,
  object,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  sortNumber,
  toggleValue,
  uniqueValues,
} from 'utils/array';
import { objectHasProperties } from 'utils/object';
import {
  pascalCase,
  setTitle,
} from 'utils/string';
import * as Portrait from '../../images/mount';
import MountViewer from './MountViewer';

class Mounts extends Component {
  static propTypes = {
    fetchMounts: func.isRequired,
    mounts: object,
    match: object,
    displayGrid: bool,
    setDisplayGrid: func.isRequired,
    onlyObtainable: bool,
    setOnlyObtainable: func.isRequired,
    types: object,
    mountObtainTypes: object,
    history: object,
    mobile: bool,
  };

  state = {
    search: '',
    mountType: 0,
    speed: 0,
    obtainTypes: [],
    orderBy: 'moveSpeed',
    order: 'asc',
  };

  speedTiers = new Map();

  componentDidMount() {
    this.speedTiers.set(0, 'All');
    this.props.fetchMounts();

    if (objectHasProperties(this.props.mounts)) {
      this.updateSpeedTiers(this.props);
    }
  }

  UNSAFE_componentWillUpdate(nextProps) {
    if (!objectHasProperties(this.props.mounts) && objectHasProperties(nextProps.mounts)) {
      this.updateSpeedTiers(nextProps);
    }
  }

  updateSpeedTiers(props) {
    uniqueValues(Object.values(props.mounts).map(m => m[0].moveSpeed).filter(m => m > 0)).forEach(s => this.speedTiers.set(s, `${s} m/s`));
    this.speedTiers = new Map([...this.speedTiers].sort((a, b) => sortNumber(a[0], b[0])));
  }

  setSearch = (e) => {
    const { value: search } = e.target;
    this.setState({ search });
  };

  setType = (e, mountType) => {
    this.setState({ mountType: Number(mountType) });
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
    const {
      match: { params: { mount } },
      displayGrid,
      setDisplayGrid,
      onlyObtainable,
      setOnlyObtainable,
      mobile,
    } = this.props;
    const { mounts: mountData, types, mountObtainTypes } = this.props;

    if (!mount) {
      setTitle('Mounts');
    }

    const mounts = Object.entries(mountData).filter(([, mountList]) => {
      const [mount] = mountList;
      const mountObtain = MOUNT_OBTAIN.find(m => m.name === mount.name);
      if (search.length > 2 && mount.name.toLowerCase().indexOf(search.toLowerCase()) === -1 && pathOr('', ['itemName'])(mountObtain).toLowerCase().indexOf(search.toLowerCase()) === -1) {
        return false;
      }

      if (mountType > 0 && !mount.typeIds.includes(mountType)) {
        return false;
      }

      if (obtainTypes.length && !mount.obtainIds.some(r => obtainTypes.includes(r))) {
        return false;
      }

      if (speed > 0 && Number.parseFloat(mount.moveSpeed) !== Number.parseFloat(speed)) {
        return false;
      }

      return !(onlyObtainable && mount.obtainIds.length === 0);
    }).sort(([, x], [, y]) => {
      const [a] = x;
      const [b] = y;
      if (displayGrid) {
        if (a.moveSpeed === b.moveSpeed) {
          return this.sort(a.name.toLowerCase(), b.name.toLowerCase());
        } else {
          if (a.moveSpeed === 0) return 1;
          if (b.moveSpeed === 0) return -1;
          return a.moveSpeed - b.moveSpeed;
        }
      } else {
        const f = orderBy === 'name' ? 'moveSpeed' : 'name';

        if (a[orderBy] === b[orderBy]) {
          if (f === 'name') {
            return this.sort(a.name.toLowerCase(), b.name.toLowerCase());
          } else {
            if (a[f] === 0) return 1;
            if (b[f] === 0) return -1;
            return a[f] - b[f];
          }
        } else {
          let sort;
          if (orderBy === 'name') {
            sort = this.sort(a.name.toLowerCase(), b.name.toLowerCase());
          } else if (a.moveSpeed === 0) {
            sort = 1;
          } else if (b.moveSpeed === 0) {
            sort = -1;
          } else {
            sort = a.moveSpeed - b.moveSpeed;
          }
          return sort * (order !== 'asc' ? -1 : 1);
        }
      }
    });

    return (
      <>
        <Paper className="section">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5" className="title-text">Mounts</Typography>
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
              value={mountType}
              options={{ 0: 'All', ...types }}
              onChange={this.setType}
              renderValue={(v) => (v === 0) ? 'All' : types[v]}
            />
            <SelectField
              id="mount-speed"
              label="Base Speed"
              value={speed}
              options={this.speedTiers}
              onChange={this.setSpeed}
              controlClassName="small"
              renderValue={(v) => this.speedTiers.get(v)}
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
              <ButtonGroup size="small">
                {Object.values(mountObtainTypes).map(obtainBy => (
                  <Tooltip title={obtainBy.name} key={`obt-${obtainBy.id}`}>
                    <Button
                      variant={obtainTypes.includes(obtainBy.id) ? 'contained' : 'outlined'}
                      className={cn({ selected: obtainTypes.includes(obtainBy.id) })}
                      onClick={() => this.handleObtainChange(obtainBy.id)}
                    >
                      <span className={cn('dropdown-icon', obtainBy.icon)} />
                    </Button>
                  </Tooltip>
                ))}
              </ButtonGroup>
            </div>
          </div>
        </Paper>
        {mobile &&
        <AdContainer type="feed" />}
        {displayGrid
          ? <div className="section">
            <div className="mount-grid">
              {mounts.map(([mountId, mountList]) => {
                const [mount] = mountList;
                return (
                  <Zoom in unmountOnExit key={mount.id}>
                    <Paper className="mount">
                      <Link to={`/mounts/${mountId}`}>
                        <div className="portrait">
                          <img
                            src={Portrait[pascalCase(mount.name)] || NoPortrait}
                            alt={mount.name}
                          />
                          {mount.obtainIds.length > 0 &&
                          <div className="obtainables">
                            {mount.obtainIds.sort(sortNumber).map(obtainId => (
                              <Tooltip
                                title={mountObtainTypes[obtainId].name}
                                key={`${pascalCase(mountId)}-${obtainId}`}>
                                <span className={cn('dropdown-icon', mountObtainTypes[obtainId].icon)} />
                              </Tooltip>
                            ))}
                          </div>}
                          <Typography className="name">{mount.name}</Typography>
                          <Typography className="speed" variant="caption">{mount.moveSpeed} m/s</Typography>
                        </div>
                      </Link>
                    </Paper>
                  </Zoom>
                );
              })}
            </div>
            {mounts.length === 0 &&
            <Paper>
              {!objectHasProperties(mountData)
                ? <CircularProgress color="primary" className="no-results" />
                : <Typography className="no-results">
                  No mounts meet the criteria.
                </Typography>
              }
            </Paper>}
          </div>
          : <Paper className="section mount-table">
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
                      active={orderBy === 'moveSpeed'}
                      direction={order}
                      onClick={this.handleSort('moveSpeed')}
                    >
                      Speed
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Skills</TableCell>
                  <TableCell>Obtain By</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mounts.map(([mountId, mountList]) => {
                  const [mount] = mountList;
                  return (
                    <TableRow key={mountId} onClick={() => this.props.history.push(`/mounts/${mountId}`)}>
                      <TableCell className="mount-icon">
                        <Tooltip
                          title={<img
                            src={Portrait[pascalCase(mount.name)] || NoPortrait}
                            alt={mount.name}
                            className="portrait-tooltip"
                          />}
                          placement="right"
                        >
                          <img src={`/images/icon/${mount.icon}.png`} alt={mount.name} />
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        {mount.name}
                      </TableCell>
                      <TableCell>
                        {mount.moveSpeed} m/s
                      </TableCell>
                      <TableCell>
                        <div className="mount-skills">
                          {mount.skillIds.map(skillId => (
                            <SkillIcon key={`${mount.id}-${skillId}`} id={skillId} className="size-sm" />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {mount.obtainIds.sort(sortNumber).map(obtainId => (
                          <Tooltip
                            title={mountObtainTypes[obtainId].name}
                            key={`${pascalCase(mountId)}-${obtainId}`}>
                            <span className={cn('dropdown-icon', mountObtainTypes[obtainId].icon)} />
                          </Tooltip>
                        ))}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {!objectHasProperties(mountData) &&
                <TableRow className="no-results">
                  <TableCell colSpan="5" align="center">
                    {mountData.length === 0
                      ? <CircularProgress color="primary" />
                      : 'No mounts meet the criteria.'
                    }
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
        <AdContainer type="horizontal" />
      </>
    );
  }
}

const mapStateToProps = ({
                           display: { mobile },
                           mounts: mountData,
                           gameData: { mounts: { mounts, types, obtainTypes } },
                         }) => ({
  ...mountData,
  mounts,
  types,
  mountObtainTypes: obtainTypes,
  mobile,
});

const mapDispatchToProps = {
  setDisplayGrid,
  setOnlyObtainable,
  fetchMounts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Mounts);
