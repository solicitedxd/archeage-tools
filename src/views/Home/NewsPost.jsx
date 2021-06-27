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
import cn from 'classnames';
import Comments from 'components/Comments/Comments';
import IfPerm from 'components/IfPerm/IfPerm';
import Link from 'components/Link';
import OptionalTooltip from 'components/OptionalTooltip';
import Username from 'components/Username';
import Viewer from 'components/WYSIWYG/Viewer';
import config from 'config';
import { NOTIFICATION_TYPE } from 'constants/notification';
import moment from 'moment';
import React, { Component } from 'react';
import {
  bool,
  object,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { isNumber } from 'utils/number';
import {
  substitute,
} from 'utils/string';
import xhr from 'utils/xhr';
import EditNewsPost from './EditNewsPost';

class NewsPost extends Component {
  static propTypes = {
    match: object,
    mobile: bool,
  };

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
    const { match: { params: { postId, action } }, mobile } = this.props;

    if (action === 'edit') {
      return <EditNewsPost {...this.props} />;
    }

    const { id, title, body, author, createDate, editDate, comments, commentCount, loading } = (this.state || this.props);
    const isEdited = (editDate && editDate !== createDate);
    const standalone = postId !== null;

    const dateBlock = loading
      ? <Skeleton variant="text" width={60} />
      : (
        <OptionalTooltip
          title={isEdited ? `Edited: ${new Date(editDate).toLocaleString(navigator.language || 'en-US')}` : null}
        >
          <Typography variant="overline" className={cn({ 'mark-tooltip': isEdited })}>
            {moment(createDate).format('MMM DD, YYYY')}
          </Typography>
        </OptionalTooltip>
      );

    const authorBlock = loading
      ? <Skeleton variant="text" width={60} className={cn({ 'title-text': standalone })} />
      : <Typography variant="subtitle2" className={cn({ 'title-text': !mobile, 'news-author': !mobile })}>
        {mobile && 'Written '} by {mobile ? <Username user={author} /> : author}
      </Typography>;

    let titleNode = <Skeleton variant="text" width={180} />;
    if (!loading) {
      if (standalone) {
        titleNode = title;
      } else {
        titleNode = <Link to={`/news/${id}`} color="inherit">{title}</Link>;
      }
    }

    return (
      <>
        <div className="section">
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="h5" className={cn({ 'title-text': mobile })}>
                {titleNode}
              </Typography>
              {!mobile && authorBlock}
              {!mobile && dateBlock}
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
            {/* <DraftJSRender contentState={stringToContentState(body)} />*/}
            <Viewer value={body} />
            {(!standalone || mobile) &&
            <CardActions className="paper-action" disableSpacing>
              {!standalone &&
              <Button
                startIcon={<ChatBubbleIcon />}
                onClick={() => push(`/news/${id}#comments`)}
              >
                {commentCount}{!mobile && ' Comments'}
              </Button>}
              {mobile &&
              (standalone
                ? <>
                  {authorBlock}
                  {dateBlock}
                </>
                : <div style={{ textAlign: 'right' }}>
                  {authorBlock}
                  {dateBlock}
                </div>)}
            </CardActions>}
          </Paper>}
          {loading &&
          <Paper>
            <div className="body-container">
              <Skeleton variant="rect" width="100%" height={200} />
            </div>
          </Paper>}
        </div>
        {standalone && id && !loading &&
        <Comments
          postId={`NEWS-${id}`}
          comments={comments}
          commentCount={commentCount}
        />}
      </>
    );
  }
}

const mapStateToProps = ({ display: { mobile } }) => ({
  mobile,
});

const mapDispatchToProps = {
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsPost);
