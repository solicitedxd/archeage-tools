import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import HomeIcon from '@material-ui/icons/Home';
import RefreshIcon from '@material-ui/icons/Refresh';
import { openDialog } from 'actions/display';
import {
  fetchBonds,
  fetchContinents,
  fetchServers,
  updateBonds,
} from 'actions/gameData';
import cn from 'classnames';
import IfPerm from 'components/IfPerm';
import Item from 'components/Item';
import OptionalTooltip from 'components/OptionalTooltip';
import {
  BOND_CHANGE_TIME,
  BOND_QUANTITY,
  BOND_ZONE_MATERIAL,
  CAUTION_ZONES,
} from 'constants/bluesaltbonds';
import {
  DIALOG_MY_GAME,
  SERVER,
} from 'constants/display';
import { REGIONS } from 'constants/myGame';
import moment from 'moment-timezone';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  array,
  bool,
  func,
  number,
  object,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { deepCopy } from 'utils/object';
import { getZonePrefix } from 'utils/tradepacks';

class CurrentBonds extends Component {
  static propTypes = {
    bonds: array,
    serverId: number,
    servers: object,
    zones: object,
    mobile: bool,
    fetchServers: func.isRequired,
    fetchBonds: func.isRequired,
    updateBonds: func.isRequired,
    fetchContinents: func.isRequired,
    openDialog: func.isRequired,
  };

  static defaultProps = {
    server: null,
    servers: {},
  };

  state = {
    refreshAllow: false,
    editing: false,
    editedBonds: [],
  };

  componentDidMount() {
    this.props.fetchServers();
    this.props.fetchContinents();

    this.refreshBonds();
  }

  refreshBonds = () => {
    this.setState({ refreshAllow: false });
    this.props.fetchBonds();

    setTimeout(() => {
      this.setState({ refreshAllow: true });
    }, 10000);
  };

  editBonds = () => {
    this.setState({ editing: true, editedBonds: deepCopy(this.props.bonds) });
  };

  closeEdit = () => {
    this.setState({ editing: false });
  };

  changeBond = (zoneId) => (e, v) => {
    const { editedBonds } = this.state;
    const { value } = v.props;

    const bond = editedBonds.find(b => b.zoneId === zoneId) || {};

    bond.count = Number(value);
    bond.edited = true;
    this.setState({ editedBonds });
  };

  saveBonds = () => {
    this.props.updateBonds(this.state.editedBonds.filter(b => b.edited));
    this.closeEdit();
  };

  clearEdit = () => {
    const { editedBonds } = this.state;
    editedBonds.forEach(b => {
      b.count = 0;
      b.edited = true;
    });
    this.setState({ editedBonds });
  };

  render() {
    const { serverId, servers, bonds, zones, openDialog, mobile } = this.props;
    const { refreshAllow, editing, editedBonds } = this.state;

    const server = servers[serverId];
    const serverName = pathOr('', ['name'])(server);
    const region = pathOr(REGIONS.NA, ['region'])(server);
    const [hh, mm, ss] = (BOND_CHANGE_TIME[region] || '').split(':');
    const lastChange = moment.utc().hour(hh).minute(mm).second(ss).milliseconds(0);
    if (lastChange.isAfter(moment.now())) {
      lastChange.subtract(1, 'day');
    }

    const updated = server && bonds.find(b => moment(b.timestamp).isAfter(lastChange) && b.count > 0);

    return (
      <div className="current-bonds">
        <Paper>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className="title-text">
                {serverName ? `[${serverName}] Current Locations` : 'No Server Selected'}
              </Typography>
              <IfPerm permission={`bsb.${serverName.toLowerCase()}`}>
                <Tooltip title={`Edit ${serverName}`}>
                  <IconButton onClick={this.editBonds} color="inherit">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </IfPerm>
              <Tooltip title="Refresh">
                <span>
                  <IconButton disabled={!refreshAllow} onClick={this.refreshBonds} color="inherit">
                    <RefreshIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </Toolbar>
          </AppBar>
          {!serverName &&
          <Button
            onClick={() => openDialog(DIALOG_MY_GAME, SERVER)}
            startIcon={<HomeIcon />}
            style={{ margin: '4px auto', display: 'flex' }}
          >
            Select Server
          </Button>}
          {serverName && !updated &&
          <Typography style={{ padding: '4px 8px' }}>
            This server&apos;s bond locations have not been updated yet today.
          </Typography>}
          {serverName && updated &&
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell />
                {Object.keys(BOND_QUANTITY).map(qty => (
                  <TableCell key={`bsbh-${qty}`}>
                    <span className="dropdown-icon quest" /> {qty}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(BOND_ZONE_MATERIAL).map(([itemId, zoneIds]) => (
                <TableRow key={`bsb-${itemId}`}>
                  <TableCell className="row-icon">
                    <Item id={Number(itemId)} count={0} inline />
                  </TableCell>
                  {Object.keys(BOND_QUANTITY).map(qty => (
                    <TableCell key={`bsb-${itemId}-${qty}`}>
                      {bonds
                      .filter(b => zoneIds.includes(b.zoneId) && b.count === Number(qty))
                      .map(b => (
                        <OptionalTooltip
                          title={CAUTION_ZONES.includes(b.zoneId) ? 'Caution: Faction guards' : null}
                          key={`bz-${itemId}-${b.zoneId}`}
                        >
                          <span className={cn({ 'bsb-caution': CAUTION_ZONES.includes(b.zoneId) })}>
                            {getZonePrefix(pathOr('', [b.zoneId, 'name'])(zones), b.zoneId)}
                          </span>
                        </OptionalTooltip>
                      )).reduce((a, x, i) => a === null ? [x] : [a, <br key={`b-${itemId}-${qty}-${i}`} />, x], null)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>}
        </Paper>
        <Dialog
          open={editing}
          onClose={this.closeEdit}
          maxWidth="xl"
          fullScreen={mobile}
        >
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="subtitle1" className="title-text">Edit {serverName} Bond Locations</Typography>
              <IconButton color="inherit" aria-label="Close" onClick={this.closeEdit}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <div className="bond-location-editor">
              {Object.entries(BOND_ZONE_MATERIAL).map(([itemId, zoneIds]) => (
                <div className="bond-type" key={`ebsb-${itemId}`}>
                  <Item id={Number(itemId)} count={0} />
                  <div className="bond-zones">
                    {zoneIds.map(zoneId => zoneId ? (
                      <FormControl key={`ebsb-z${zoneId}`} className="bond-zone">
                        <InputLabel id={`bsb-${zoneId}-label`}>{pathOr('', [zoneId, 'name'])(zones)}</InputLabel>
                        <Select
                          labelId={`bsb-${zoneId}-label`}
                          id={`bsb-${zoneId}`}
                          value={(editedBonds.find(b => b.zoneId === zoneId) || {}).count}
                          onChange={this.changeBond(zoneId)}
                        >
                          {[0, ...Object.keys(BOND_QUANTITY)].map(qty => (
                            <MenuItem key={`ebsb-${zoneId}-${qty}`} value={qty}>{qty}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : <FormControl className="bond-zone" />)}
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
          <DialogActions>
            <div style={{ flex: 1 }}>
              <Button onClick={this.clearEdit}>Set All 0</Button>
            </div>
            <Button onClick={this.closeEdit}>Cancel</Button>
            <Button color="primary" onClick={this.saveBonds}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ myGame: { server }, gameData: { servers, bonds, zones }, display: { mobile } }) => ({
  serverId: server,
  servers,
  bonds: bonds.filter(b => b.serverId === server),
  zones,
  mobile,
});

const mapDispatchToProps = {
  fetchServers,
  fetchBonds,
  updateBonds,
  fetchContinents,
  openDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBonds);
