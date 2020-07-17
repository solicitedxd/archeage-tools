import {
  amber,
  green,
} from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import cn from 'classnames';
import { NOTIFICATION_TYPE } from 'constants/notification';
import React from 'react';
import {
  bool,
  func,
  number,
  oneOf,
  string,
} from 'react-proptypes';

const variantIcon = {
  [NOTIFICATION_TYPE.SUCCESS]: CheckCircleIcon,
  [NOTIFICATION_TYPE.WARNING]: WarningIcon,
  [NOTIFICATION_TYPE.ERROR]: ErrorIcon,
  [NOTIFICATION_TYPE.INFO]: InfoIcon,
};

const useStyles = makeStyles(theme => ({
  [NOTIFICATION_TYPE.SUCCESS]: {
    backgroundColor: green[600],
  },
  [NOTIFICATION_TYPE.ERROR]: {
    backgroundColor: theme.palette.error.dark,
    color: '#FFFFFF',
  },
  [NOTIFICATION_TYPE.INFO]: {
    backgroundColor: theme.palette.primary.main,
  },
  [NOTIFICATION_TYPE.WARNING]: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Notification = (props) => {
  const classes = useStyles();
  const { className, message, variant, open, handleClose, duration, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
    >
      <SnackbarContent
        className={cn(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
          <Icon className={cn(classes.icon, classes.iconVariant)} />
            {message}
        </span>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    </Snackbar>
  );
};

Notification.propTypes = {
  className: string,
  message: string,
  handleClose: func,
  variant: oneOf(Object.values(NOTIFICATION_TYPE)).isRequired,
  duration: number,
  open: bool,
};

export default Notification;
