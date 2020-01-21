import {
  AppBar,
  Button,
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
import OptionalTooltip from 'components/OptionalTooltip';
import WYSIWYG from 'components/WYSIWYG';
import config from 'config';
import { NOTIFICATION_TYPE } from 'constants/notification';
import moment from 'moment';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { substitute } from 'utils/string';
import xhr from 'utils/xhr';

class EditNewsPost extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    const { match: { params: { action } } } = props;
    props.requiresPermission(`news.${action === 'edit' ? 'update' : 'create'}`, '/news');

    this.state = {
      initialBody: '',
      formData: {
        title: '',
        body: '',
      },
      author: props.username,
      createDate: Date.now(),
      editDate: null,
      loading: false,
    };
  }

  componentDidMount() {
    const { match: { params: { postId, action } } } = this.props;
    if (action === 'edit' && postId) {
      this.setState({ loading: true });
      xhr.get(substitute(config.endpoints.service.newsPost, { postId }))
      .then(({ data }) => {
        this.setState({
          initialBody: data.body,
          formData: {
            ...data,
            body: '',
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

  handleEditor = (body) => {
    const { formData } = this.state;
    this.setState({ formData: { ...formData, body } });
  };

  handleSubmit = (e) => {
    const { match: { params: { action, postId } } } = this.props;
    this.setState({ loading: true });

    e.preventDefault();

    const method = (action === 'edit') ? xhr.put : xhr.post;
    const endpoint = (action === 'edit') ? substitute(config.endpoints.service.newsPost, { postId })
      : config.endpoints.service.newsPost;

    method(endpoint, { ...this.state.formData })
    .then(({ data }) => {
      this.props.setNotification(`${data.title} has been saved.`, NOTIFICATION_TYPE.SUCCESS);
      push(`/news/${data.id}`);
    })
    .catch((error) => {
      const message = pathOr('Failed to save news post.', ['data', 'errorMessage'])(error);
      this.props.setNotification(message, NOTIFICATION_TYPE.ERROR);
      this.setState({ loading: false });
    });
  };

  handleDelete = () => {

  };

  handleDeleteConfirm = () => {

  };

  render() {
    const { match: { params: { postId, action } } } = this.props;
    const { formData: { title }, author, createDate, editDate, initialBody, loading } = this.state;

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
                  title={editDate ? `Edited: ${new Date(editDate).toLocaleString(navigator.language || 'en-US')}`
                    : null}
                >
                  <Typography variant="overline" className={editDate ? 'mark-tooltip' : ''}>
                    {moment(createDate).format('MMM DD, YYYY')}
                  </Typography>
                </OptionalTooltip>
                {postId &&
                <Tooltip title="Delete">
                  <IconButton onClick={this.handleDelete} color="inherit">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>}
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
              <Paper elevation={2} className="editor-container">
                <WYSIWYG
                  initialState={initialBody}
                  onChange={this.handleEditor}
                  label="Start typing..."
                  readOnly={loading}
                />
              </Paper>
              <div className="right">
                <Button variant="contained" color="primary" type="submit" disabled={loading}>
                  {action === 'edit' ? 'Save' : 'Post'}
                </Button>
              </div>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

export const mapStateToProps = ({ session: { username } }) => ({
  username,
});

export const mapDispatchToProps = {
  requiresPermission,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditNewsPost);
