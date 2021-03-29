import AppBar from '@material-ui/core/AppBar';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Item from 'components/Item/Item';
import ItemPrice from 'components/Item/ItemPrice';
import React, { Component } from 'react';
import {
  array,
  bool,
  func,
} from 'react-proptypes';
import { connect } from 'react-redux';

class MaterialPrices extends Component {
  static propTypes = {
    materialItemIds: array,
    mobile: bool,
    open: bool,
    onClose: func.isRequired,
  };

  static defaultProps = {
    materialItemIds: [],
    mobile: false,
    open: false,
  };

  state = {};

  render() {
    const { open, onClose, mobile, materialItemIds } = this.props;
    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xl"
        fullScreen={mobile}
      >
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="subtitle1" className="title-text">Material Prices</Typography>
            <IconButton color="inherit" aria-label="Close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent className="material-prices">
          {materialItemIds.map(itemId => (
            <div key={`price-${itemId}`} className="item-price">
              <Item
                inline
                id={itemId}
              />
              <ItemPrice
                itemId={itemId}
                unitSize={1}
                inTable
              />
            </div>
          ))}
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ gameData: { tradePacks: { materialItemIds } }, itemPrice, display: { mobile } }) => ({
  materialItemIds,
  itemPrice,
  mobile,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MaterialPrices);
