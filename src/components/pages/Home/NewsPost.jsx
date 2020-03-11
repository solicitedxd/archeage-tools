import {
  AppBar,
  Button,
  CardActions,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CreateIcon from '@material-ui/icons/Edit';
import { Skeleton } from '@material-ui/lab';
import { push } from 'actions/navigate';
import { setNotification } from 'actions/notification';
import DraftJSRender from 'components/DraftJSRender';
import IfPerm from 'components/IfPerm/IfPerm';
import Link from 'components/Link';
import OptionalTooltip from 'components/OptionalTooltip';
import EditNewsPost from 'components/pages/Home/EditNewsPost';
import config from 'config';
import { NOTIFICATION_TYPE } from 'constants/notification';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isNumber } from 'utils/number';
import {
  stringToContentState,
  substitute,
} from 'utils/string';
import xhr from 'utils/xhr';

class NewsPost extends Component {
  static defaultProps = {
    match: { params: { postId: null, action: '' } },
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.loadPost(nextProps);
  }

  componentDidMount() {
    this.loadPost(this.props);
  }

  loadPost = (props) => {
    const { match: { params: { postId, action } }, setNotification } = props;

    if (postId === null) return;

    if (postId && !isNumber(postId)) {
      setNotification('News post not found.', NOTIFICATION_TYPE.ERROR);
      push('/news');
      return;
    }

    if (action !== 'edit') {
      xhr.get(substitute(config.endpoints.service.newsPost, { postId }))
      .then(({ data }) => {
        this.setState({ ...data });
      })
      .catch(() => {
        setNotification('News post not found.', NOTIFICATION_TYPE.ERROR);
        push('/news');
      });
    }
  };

  render() {
    const { match: { params: { postId, action } } } = this.props;

    if (action === 'edit') {
      return <EditNewsPost {...this.props} />;
    }

    const { id, title, body, author, createDate, editDate, comments, commentCount, loading } = (this.state || this.props);

    const isEdited = (editDate && editDate !== createDate);

    return (
      <div className="section">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h5">
              {loading
                ? <Skeleton variant="text" width={180} />
                : (postId !== null ? title : <Link to={`/news/${id}`} color="inherit">{title}</Link>)}
            </Typography>
            <Typography variant="subtitle2" className="news-author title-text">
              {loading
                ? <Skeleton variant="text" width={60} />
                : <>&nbsp;by {author}</>}</Typography>
            {!loading &&
            <OptionalTooltip
              title={isEdited ? `Edited: ${new Date(editDate).toLocaleString(navigator.language || 'en-US')}` : null}
            >
              <Typography variant="overline" className={isEdited ? 'mark-tooltip' : ''}>
                {moment(createDate).format('MMM DD, YYYY')}
              </Typography>
            </OptionalTooltip>}
            {loading && <Skeleton variant="text" width={60} />}
            {!loading &&
            <IfPerm permission="news.edit">
              <Tooltip title="Edit Post">
                <IconButton color="inherit" onClick={() => push(`/news/${id}/edit`)}>
                  <CreateIcon />
                </IconButton>
              </Tooltip>
            </IfPerm>}
          </Toolbar>
        </AppBar>
        {!loading &&
        <Paper>
          <DraftJSRender contentState={stringToContentState(body)} />
          {postId === null &&
          <CardActions className="comments-action" disableSpacing>
            <Button
              startIcon={<ChatBubbleIcon />}
              onClick={() => push(`/news/${id}#comments`)}
            >
              Comments: {commentCount}
            </Button>
          </CardActions>}
        </Paper>}
        {loading &&
        <Paper>
          <Skeleton variant="rect" width="100%" height={200} />
        </Paper>}
      </div>
    );
  }
}

const mapDispatchToProps = {
  setNotification,
};

export default connect(null, mapDispatchToProps)(NewsPost);
