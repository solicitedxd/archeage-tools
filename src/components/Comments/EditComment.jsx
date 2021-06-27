import {
  Paper,
  Typography,
} from '@material-ui/core';
import { setNotification } from 'actions/notification';
import { requiresPermission } from 'actions/session';
import WYSIWYG from 'components/WYSIWYG';
import { EDITOR_TYPE } from 'components/WYSIWYG/controls';
import config from 'config';
import { NOTIFICATION_TYPE } from 'constants/notification';
import {
  func,
  number,
  string,
} from 'prop-types';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { substitute } from 'utils/string';
import xhr from 'utils/xhr';

const MAX_LENGTH = 1000;

class EditComment extends Component {
  static propTypes = {
    id: number,
    postId: string.isRequired,
    onCancel: func.isRequired,
    onUpdateComments: func.isRequired,
    depth: number,
    replyUser: string,
    reply: number,
    requiresPermission: func.isRequired,
    setNotification: func.isRequired,
  };

  static defaultProps = {
    depth: 1,
    replyUser: null,
    reply: null,
  };

  constructor(props) {
    super(props);
    const { onCancel, ...otherProps } = props;
    if (!props.id) {
      props.requiresPermission('comment.create', onCancel, 'You do not have permission to perform this action.');
    }

    this.state = {
      ...otherProps,
      loading: false,
      charCount: 0,
    };
  }

  componentDidMount() {
    const { id, setNotification, onCancel } = this.props;
    if (id) {
      this.setState({ loading: true });
      xhr.get(substitute(config.endpoints.service.comment, { commentId: id }))
      .then(({ data }) => {
        if (data.deleted) {
          setNotification('This comment has been deleted and cannot be edited.', NOTIFICATION_TYPE.WARNING);
          onCancel();
          return;
        }
        this.setState({
          ...data,
          loading: false,
        });
      })
      .catch(error => {
        const message = pathOr('Failed to find comment.', ['data', 'errorMessage'])(error);

        setNotification(message, NOTIFICATION_TYPE.ERROR);
        onCancel();
      });
    }
  }

  handleSave = (body) => {
    const { id, postId, reply, onUpdateComments, onCancel, setNotification } = this.props;
    const { charCount } = this.state;

    // const contentLength = getCharCountOfContentString(body);
    if (charCount < 10) {
      setNotification('Please use at least 10 characters.', NOTIFICATION_TYPE.WARNING);
      return;
    }
    if (charCount > MAX_LENGTH) {
      setNotification(`You cannot use more than ${MAX_LENGTH} characters.`, NOTIFICATION_TYPE.WARNING);
      return;
    }

    this.setState({ loading: true });

    const method = id ? xhr.put : xhr.post;
    const endpoint = id ? substitute(config.endpoints.service.comment, { commentId: id })
      : config.endpoints.service.newComment;

    method(endpoint, {
      postId,
      body,
      reply,
    })
    .then(({ data }) => {
      onUpdateComments(data);
      onCancel();
    })
    .catch((error) => {
      const message = pathOr('Failed to save comment.', ['data', 'errorMessage'])(error);
      setNotification(message, NOTIFICATION_TYPE.ERROR);
      onCancel();
    });
  };

  handleCharCount = (charCount) => this.setState({ charCount });

  render() {
    const { depth, onCancel, id, replyUser } = this.props;
    const { body, loading } = this.state;
    let title = 'Editing Comment';
    if (!id) {
      if (replyUser) {
        title = `Replying to ${replyUser}`;
      } else {
        title = 'New Comment';
      }
    }

    return (
      <Paper elevation={depth} className="paper-border">
        <div style={{ width: '100%' }} className="body-container">
          <Typography variant="body2">
            {title}
          </Typography>
          <WYSIWYG
            type={EDITOR_TYPE.COMMENT}
            value={body}
            onSave={this.handleSave}
            onCancel={onCancel}
            label="Enter your comment here."
            readOnly={loading}
            noMargin
            maxLength={MAX_LENGTH}
            getCharCount={this.handleCharCount}
          />
        </div>
      </Paper>
    );
  }
}

const mapDispatchToProps = {
  requiresPermission,
  setNotification,
};

export default connect(null, mapDispatchToProps)(EditComment);
