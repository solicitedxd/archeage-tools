import {
  Button,
  Collapse,
  Tooltip,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ReplyIcon from '@material-ui/icons/Reply';
import Avatar from 'components/Avatar';
import EditComment from 'components/Comments/EditComment';
import DraftJSRender from 'components/DraftJSRender';
import IfPerm from 'components/IfPerm';
import Username from 'components/Username';
import moment from 'moment';
import {
  array,
  bool,
  func,
  number,
  string,
} from 'prop-types';
import React, { Component } from 'react';
import { sortBy } from 'utils/array';
import { stringToContentState } from 'utils/string';

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
    this.setState({ collapsed, reply: false });
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

  render() {
    const { id, postId, body, author, createDate, editDate, replies, deleted, depth, onUpdateComments, sortAsc } = this.props;
    const { collapsed, reply, edit, deleteOpen } = this.state;
    const isEdited = (editDate && editDate !== createDate) && !deleted;

    return (
      <div className="paper-border no-border">
        <div className="collapsible-left">
          <Avatar user={author} size={16} />
          <Tooltip title={collapsed ? 'Expand' : 'Collapse'} placement="top">
            <div className="collapse sm" onClick={this.setCollapsed(!collapsed)} />
          </Tooltip>
        </div>
        <div className="collapsible-right">
          <div>
            <Username user={author} />
            <Typography variant="caption" className="time">
              {moment(createDate).fromNow()}
            </Typography>
            {isEdited &&
            <Tooltip title={new Date(editDate).toLocaleString(navigator.language || 'en-US')}>
              <Typography variant="caption" className="time edited">
                (edited)
              </Typography>
            </Tooltip>}
          </div>
          <Collapse in={!collapsed}>
            <DraftJSRender contentState={stringToContentState(body)} />
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
              <IfPerm permission="comment.edit">
                <Button
                  startIcon={<EditIcon />}
                  onClick={this.setEdit(true)}
                >
                  Edit
                </Button>
              </IfPerm>
              <IfPerm permission="comment.delete">
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
              <Comment
                {...reply}
                onUpdateComments={onUpdateComments}
                key={`comment-${reply.id}`}
                depth={depth + 1}
                sortAsc={sortAsc}
              />
            ))}
          </Collapse>
        </div>
      </div>
    );
  }
}

export default Comment;
