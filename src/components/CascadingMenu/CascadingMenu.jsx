import {
  Menu,
  MenuItem,
  MenuList,
  Paper,
  withStyles,
} from '@material-ui/core';
import { ArrowLeft } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './CascadingMenu.styles';

// source: https://github.com/mui-org/material-ui/issues/11723

class CascadingMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subMenuStates: [],
    };
  }

  handleItemClick = (event, menuItem) => {
    const hasSubMenu = !!(
      menuItem.subMenuItems && menuItem.subMenuItems.length
    );

    if (hasSubMenu) {
      // hide already open sub menus and open the requested sub menu
      const subMenuStates = [...this.state.subMenuStates];

      for (const subMenuState of subMenuStates) {
        if (subMenuState.key === menuItem.key) {
          subMenuState.anchorElement = event.target;
          subMenuState.open = !subMenuState.open;
        } else {
          subMenuState.open = false;
        }
      }

      this.setState({ subMenuStates });
    } else {
      this.closeAllMenus();
    }

    menuItem.onClick();
  };

  closeAllMenus() {
    this.setState({ subMenuStates: [] });
    this.props.onClose();
  }

  renderMenuItem = menuItem => {
    const { classes } = this.props;
    const { subMenuStates } = this.state;
    const hasSubMenu = !!(
      menuItem.subMenuItems && menuItem.subMenuItems.length
    );
    let subMenuState = subMenuStates.find(
      menuState => menuState.key === menuItem.key,
    );

    // initialize state for sub menu
    if (hasSubMenu && !subMenuState) {
      subMenuState = {
        key: menuItem.key,
        anchorElement: null,
        open: false,
      };

      subMenuStates.push(subMenuState);
    }

    return (
      <MenuItem
        onClick={e => this.handleItemClick(e, menuItem)}
        className={classes.menuItem}
        key={menuItem.key}
      >
        {hasSubMenu && (
          <React.Fragment>
            <ArrowLeft className={classes.arrowIcon} />
            <Paper
              className={`${classes.subMenu} ${
                subMenuState.open ? classes.subMenuOpen : ''
              }`}
            >
              <MenuList>
                {menuItem.subMenuItems.map(subMenuItem =>
                  this.renderMenuItem(subMenuItem),
                )}
              </MenuList>
            </Paper>
          </React.Fragment>
        )}
        <div className={classes.caption}>{menuItem.caption}</div>
      </MenuItem>
    );
  };

  render() {
    // no-unused-vars is disabled so that menuItems isn't passed to Menu
    // eslint-disable-next-line no-unused-vars
    const {
      anchorElement,
      open,
      onClose,
      menuItems,
      classes,
      ...others
    } = this.props;

    return (
      <Menu
        {...others}
        anchorEl={anchorElement}
        elevation={2}
        classes={{
          paper: classes.rootMenu,
        }}
        open={open}
        onClose={() => this.closeAllMenus()}
      >
        {menuItems.map(menuItem => this.renderMenuItem(menuItem))}
      </Menu>
    );
  }
}

CascadingMenu.propTypes = {
  anchorElement: PropTypes.any,
  classes: PropTypes.any,
  menuItems: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withStyles(styles)(CascadingMenu);
