import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  push,
  replace,
} from 'actions/navigate';
import { setNotification } from 'actions/notification';
import { requiresPermission } from 'actions/session';
import IfPerm from 'components/IfPerm/IfPerm';
import OptionalTooltip from 'components/OptionalTooltip';
import WYSIWYG from 'components/WYSIWYG';
import { EDITOR_TYPE } from 'components/WYSIWYG/controls';
import config from 'config';
import { NOTIFICATION_TYPE } from 'constants/notification';
import moment from 'moment';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  func,
  object,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { substitute } from 'utils/string';
import xhr from 'utils/xhr';

class EditNewsPost extends Component {
  static propTypes = {
    match: object,
    requiresPermission: func.isRequired,
    setNotification: func.isRequired,
    username: string,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    const { match: { params: { action } } } = props;
    props.requiresPermission(`news.${action === 'edit' ? 'edit' : 'create'}`, '/news');

    this.state = {
      formData: {
        title: '',
        body: '',
        author: props.username,
      },
      createDate: Date.now(),
      editDate: null,
      loading: false,
      deleteConfirm: false,
    };
  }

  componentDidMount() {
    const { match: { params: { postId, action } } } = this.props;
    if (action === 'edit' && postId) {
      this.setState({ loading: true });
      xhr.get(substitute(config.endpoints.service.newsPost, { postId }))
      .then(({ data }) => {
        this.setState({
          formData: {
            ...data,
          },
          createDate: data.createDate,
          editDate: data.editDate,
          loading: false,
        });
      })
      .catch(error => {
        const message = pathOr('Failed to get existing news post.', ['data', 'errorMessage'])(error);

        this.props.setNotification(message, NOTIFICATION_TYPE.ERROR);
        replace('/news');
      });
    }
  }

  handleChange = (field) => (e) => {
    const { formData } = this.state;
    this.setState({ formData: { ...formData, [field]: e.target.value } });
  };

  handleSubmit = (body) => {
    const { match: { params: { action, postId } }, setNotification } = this.props;
    const { formData } = this.state;
    this.setState({ loading: true });

    const method = (action === 'edit') ? xhr.put : xhr.post;
    const endpoint = (action === 'edit') ? substitute(config.endpoints.service.newsPost, { postId })
      : config.endpoints.service.newsCreate;

    method(endpoint, { ...formData, body })
    .then(({ data }) => {
      setNotification(`${data.title} has been saved.`, NOTIFICATION_TYPE.SUCCESS);
      push(`/news/${data.id}`);
    })
    .catch((error) => {
      const message = pathOr('Failed to save news post.', ['data', 'errorMessage'])(error);
      setNotification(message, NOTIFICATION_TYPE.ERROR);
      this.setState({ loading: false });
    });
  };

  handleDelete = () => {
    this.setState({ deleteConfirm: true });
  };

  handleDeleteCancel = () => {
    this.setState({ deleteConfirm: false });
  };

  handleDeleteConfirm = () => {
    const { match: { params: { postId } }, setNotification } = this.props;
    const { formData: { title } } = this.state;
    this.setState({ deleteConfirm: false });
    xhr.delete(substitute(config.endpoints.service.newsPost, { postId }))
    .then(() => {
      setNotification(`'${title}' has been deleted.`, NOTIFICATION_TYPE.SUCCESS);
      push('/news');
    })
    .catch((error) => {
      const message = pathOr('Failed to delete news post.', ['data', 'errorMessage'])(error);
      setNotification(message, NOTIFICATION_TYPE.ERROR);
      push('/news');
    });
  };

  render() {
    const { match: { params: { postId, action } } } = this.props;
    const { formData: { title, author, body }, createDate, editDate, loading, deleteConfirm } = this.state;
    const isEdited = (editDate && editDate !== createDate);

    return (
      <div className="section">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h4" className="title-text">{action === 'edit' ? 'Edit' : 'Create'} Post</Typography>
            <Tooltip title="Cancel">
              <IconButton onClick={() => push(`/news${postId ? `/${postId}` : ''}`)} color="inherit">
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Paper className="section">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="h5">{title || 'untitled'}</Typography>
                <Typography variant="subtitle2" className="news-author title-text">&nbsp;by {author}</Typography>
                <OptionalTooltip
                  title={isEdited ? `Edited: ${new Date(editDate).toLocaleString(navigator.language || 'en-US')}`
                    : null}
                >
                  <Typography variant="overline" className={isEdited ? 'mark-tooltip' : ''}>
                    {moment(createDate).format('MMM DD, YYYY')}
                  </Typography>
                </OptionalTooltip>
                {postId &&
                <IfPerm permission="news.delete">
                  <Tooltip title="Delete">
                    <IconButton onClick={this.handleDelete} color="inherit">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </IfPerm>}
              </Toolbar>
            </AppBar>
            <div className="body-container">
              <TextField
                required
                label="Title"
                className="title-text"
                InputLabelProps={{
                  color: 'secondary',
                }}
                fullWidth={false}
                value={title}
                onChange={this.handleChange('title')}
              />
              <WYSIWYG
                type={EDITOR_TYPE.NEWS}
                value={body}
                onSave={this.handleSubmit}
                placeholder="Start typing..."
                readOnly={loading}
                height="500px"
              />
            </div>
          </form>
        </Paper>
        <Dialog
          open={deleteConfirm}
          onClose={this.handleDeleteCancel}
        >
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="subtitle1" className="title-text">Delete Post</Typography>
              <Tooltip title="Close">
                <IconButton onClick={this.handleDeleteCancel}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <Typography>You are going to delete {title}.</Typography>
            <Typography>This action cannot be reversed. Proceed?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeleteCancel}>Cancel</Button>
            <Button color="primary" onClick={this.handleDeleteConfirm}>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ session: { username } }) => ({
  username,
});

const mapDispatchToProps = {
  requiresPermission,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditNewsPost);
