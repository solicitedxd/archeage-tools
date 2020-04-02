import {
  List,
  MenuItem,
  Tooltip,
  Typography,
} from '@material-ui/core';
import cn from 'classnames';
import Link from 'components/Link';
import React, { Component } from 'react';
import {
  array,
  func,
  node,
  oneOfType,
  string,
} from 'react-proptypes';

class NavMenu extends Component {
  static propTypes = {
    name: string.isRequired,
    children: oneOfType([array, node]),
    path: string,
    button: node,
    onClick: func,
  };

  static defaultProps = {
    children: null,
    path: null,
  };

  render() {
    const { children, name, path, button } = this.props;

    const navLink = (
      <Typography className="nav-item">
        <Link color="inherit" to={path}>
          <span className={cn('nav-icon', name)} />{name}
        </Link>
      </Typography>
    );

    // no dropdown
    if (!children) {
      return navLink;
    }

    // dropdown
    return (
      <Tooltip
        title={
          <List disablePadding>
            {Array.isArray(children)
              ? children.map(child => (
                <Link
                  color="inherit"
                  to={child.path}
                  key={`${name}-${child.name}`}
                  underline="none"
                >
                  <MenuItem>
                    {child.name}
                  </MenuItem>
                </Link>
              ))
              : children}
          </List>
        }
        classes={{
          popper: 'nav-popper',
          tooltip: 'MuiPaper-root MuiMenu-paper MuiPaper-elevation8 nav-tooltip',
        }}
        placement="bottom-start"
        interactive
      >
        {button || navLink}
      </Tooltip>
    );
  }
}

export default NavMenu;
