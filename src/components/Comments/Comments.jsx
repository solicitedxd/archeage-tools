import {
  AppBar,
  Collapse,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Edit';
import SortIcon from '@material-ui/icons/Sort';
import { setNotification } from 'actions/notification';
import IfPerm from 'components/IfPerm';
import config from 'config';
import { NOTIFICATION_TYPE } from 'constants/notification';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  array,
  func,
  number,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { sortBy } from 'utils/array';
import {
  scrollTo,
  substitute,
} from 'utils/string';
import xhr from 'utils/xhr';
import Comment from './Comment';
import EditComment from './EditComment';

class Comments extends Component {
  static propTypes = {
    postId: string.isRequired,
    comments: array,
    commentCount: number,
    setNotification: func.isRequired,
  };

  static defaultProps = {
    comments: null,
    commentCount: null,
  };

  state = {
    comments: [],
    commentCount: 0,
    newComment: false,
    sortAsc: false,
  };

  componentDidMount() {
    let { comments, commentCount } = this.props;

    if (comments === null || commentCount === null) {
      this.loadComments();
    } else {
      comments = this.sortComments(comments);
      this.setState({ comments, commentCount }, () => this.scrollToComments());
    }
  }

  loadComments = () => {
    const { postId, setNotification } = this.props;
    xhr.get(substitute(config.endpoints.service.comments, { postId }))
    .then(({ data }) => {
      this.updateComments(data);
      this.scrollToComments();
    })
    .catch(error => {
      const message = pathOr('Failed to load comments for this page.', ['data', 'errorMessage'])(error);

      setNotification(message, NOTIFICATION_TYPE.ERROR);
    });
  };

  scrollToComments = () => {
    if (document.location.hash === '#comments') {
      setTimeout(() => scrollTo('comments'), 250);
    }
  };

  countComments = (comments) => {
    if (!comments || comments.length === 0) {
      return 0;
    }

    return comments.length + comments.map(c => this.countComments(c.replies)).reduce((a, b) => a + b);
  };

  updateComments = (comments) => {
    const commentCount = this.countComments(comments);

    comments = this.sortComments(comments);
    this.setState({ comments, commentCount });
  };

  handleNewComment = () => {
    this.setState({ newComment: true });
  };

  cancelNewComment = () => {
    this.setState({ newComment: false });
  };

  setSortAsc = (sortAsc) => () => {
    this.setState({ sortAsc }, () => {
      this.setState({ comments: this.sortComments(this.state.comments) });
    });
  };

  sortComments = (comments) => {
    return comments.sort(sortBy('createDate', this.state.sortAsc));
  };

  render() {
    const { postId } = this.props;
    const { comments, commentCount, newComment, sortAsc } = this.state;

    return (
      <div className="section" id="comments">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" className="title-text">
              Comments ({commentCount})
            </Typography>
            <Tooltip title={`Show ${sortAsc ? 'Newest' : 'Oldest'} First`}>
              <IconButton color="inherit" onClick={this.setSortAsc(!sortAsc)}>
                <SortIcon />
              </IconButton>
            </Tooltip>
            <IfPerm permission="comment.create">
              <Tooltip title="Write Comment">
                <IconButton color="inherit" onClick={this.handleNewComment}>
                  <CreateIcon />
                </IconButton>
              </Tooltip>
            </IfPerm>
          </Toolbar>
        </AppBar>
        <Paper className="body-container space-children comments-container">
          <Collapse in={newComment} unmountOnExit>
            <EditComment
              postId={postId}
              depth={2}
              onCancel={this.cancelNewComment}
              onUpdateComments={this.updateComments}
            />
          </Collapse>

          {comments && comments.map(comment => (
            <Comment
              {...comment}
              onUpdateComments={this.updateComments}
              key={`comment-${comment.id}`}
              depth={2}
              sortAsc={sortAsc}
            />))}
          {(!comments || comments.length === 0) &&
          <Typography align="center">
            There are no comments on this topic.
          </Typography>}
        </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setNotification,
};

export default connect(null, mapDispatchToProps)(Comments);
