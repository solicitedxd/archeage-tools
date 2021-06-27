import {
  AppBar,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ReplyIcon from '@material-ui/icons/Reply';
import { setNotification } from 'actions/notification';
import Avatar from 'components/Avatar';
import EditComment from 'components/Comments/EditComment';
import IfPerm from 'components/IfPerm';
import Username from 'components/Username';
import Viewer from 'components/WYSIWYG/Viewer';
import config from 'config';
import { NOTIFICATION_TYPE } from 'constants/notification';
import moment from 'moment';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  array,
  bool,
  func,
  number,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { sortBy } from 'utils/array';
import { substitute } from 'utils/string';
import xhr from 'utils/xhr';

class Comment extends Component {
  static propTypes = {
    id: number.isRequired,
    postId: string.isRequired,
    body: string.isRequired,
    author: string.isRequired,
    createDate: string.isRequired,
    editDate: string,
    replies: array,
    deleted: bool,
    depth: number,
    onUpdateComments: func.isRequired,
    sortAsc: bool,
    setNotification: func.isRequired,
  };

  static defaultProps = {
    editDate: null,
    replies: [],
    deleted: false,
    depth: 2,
    sortAsc: false,
  };

  state = {
    collapsed: false,
    reply: false,
    edit: false,
    deleteOpen: false,
  };

  setCollapsed = (collapsed) => () => {
    this.setState({ collapsed, reply: false, edit: false });
  };

  setReply = (reply) => () => {
    this.setState({ reply });
  };

  setEdit = (edit) => () => {
    this.setState({ edit });
  };

  setDelete = (deleteOpen) => () => {
    this.setState({ deleteOpen });
  };

  handleDelete = () => {
    const { id, onUpdateComments, setNotification } = this.props;
    xhr.delete(substitute(config.endpoints.service.comment, { commentId: id }))
    .then(({ data }) => onUpdateComments(data))
    .catch(error => {
      const message = pathOr('Failed to delete comment.', ['data', 'errorMessage'])(error);
      setNotification(message, NOTIFICATION_TYPE.ERROR);
    })
    .finally(this.setDelete(false));
  };

  render() {
    const {
      id,
      postId,
      body,
      author,
      createDate,
      editDate,
      replies,
      deleted,
      depth,
      onUpdateComments,
      sortAsc,
    } = this.props;
    const { collapsed, reply, edit, deleteOpen } = this.state;
    const isEdited = (editDate && editDate !== createDate) && !deleted;

    return (
      <div className="paper-border no-border comment-box">
        <div className="collapsible-left">
          <Avatar user={author} size={0.875} />
          <Tooltip title={collapsed ? 'Expand' : 'Collapse'} placement="top">
            <div className="collapse sm" onClick={this.setCollapsed(!collapsed)} />
          </Tooltip>
        </div>
        <div className="collapsible-right">
          <div>
            <Username user={author} />
            <Tooltip title={new Date(createDate).toLocaleString(navigator.language || 'en-US')}>
              <Typography variant="caption" className="time">
                {moment(createDate).fromNow()}
              </Typography>
            </Tooltip>
            {isEdited &&
            <Tooltip title={new Date(editDate).toLocaleString(navigator.language || 'en-US')}>
              <Typography variant="caption" className="time edited">
                (edited {moment(editDate).fromNow()})
              </Typography>
            </Tooltip>}
          </div>
          <Collapse in={!collapsed}>
            {!edit
              ? <Viewer value={body} />
              : <EditComment
                {...this.props}
                onCancel={this.setEdit(false)}
              />}
            {!deleted &&
            <div className="small-buttons">
              <IfPerm permission="comment.create">
                <Button
                  startIcon={<ReplyIcon />}
                  onClick={this.setReply(true)}
                >
                  Reply
                </Button>
              </IfPerm>
              <IfPerm permission="comment.edit" orUserIs={author}>
                <Button
                  startIcon={<EditIcon />}
                  onClick={this.setEdit(true)}
                >
                  Edit
                </Button>
              </IfPerm>
              <IfPerm permission="comment.delete" orUserIs={author}>
                <Button
                  startIcon={<DeleteIcon />}
                  onClick={this.setDelete(true)}
                >
                  Delete
                </Button>
              </IfPerm>
            </div>}
            <Collapse in={reply} unmountOnExit>
              <EditComment
                postId={postId}
                onUpdateComments={onUpdateComments}
                onCancel={this.setReply(false)}
                depth={depth + 1}
                replyUser={author}
                reply={id}
              />
            </Collapse>
            {replies && replies.sort(sortBy('createDate', sortAsc)).map(reply => (
              <ConnectedComment
                {...reply}
                onUpdateComments={onUpdateComments}
                key={`comment-${reply.id}`}
                depth={depth + 1}
                sortAsc={sortAsc}
              />
            ))}
          </Collapse>
        </div>
        <Dialog
          open={deleteOpen}
          onClose={this.setDelete(false)}
        >
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="subtitle1" className="title-text">Delete Comment</Typography>
              <Tooltip title="Close">
                <IconButton onClick={this.setDelete(false)}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <DialogContent style={{ minHeight: 92 }}>
            <blockquote><Viewer value={body} /></blockquote>
            <Typography>Are you sure you want to delete this comment?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.setDelete(false)}>Cancel</Button>
            <Button color="primary" onClick={this.handleDelete}>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setNotification,
};

const ConnectedComment = connect(null, mapDispatchToProps)(Comment);

export default ConnectedComment;
