import {
  AppBar,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Edit';
import { push } from 'actions/navigate';
import { setNotification } from 'actions/notification';
import DraftJSRender from 'components/DraftJSRender';
import IfPerm from 'components/IfPerm/IfPerm';
import OptionalTooltip from 'components/OptionalTooltip';
import EditNewsPost from 'components/pages/Home/EditNewsPost';
import config from 'config';
import { NOTIFICATION_TYPE } from 'constants/notification';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  stringToContentState,
  substitute,
} from 'utils/string';
import xhr from 'utils/xhr';

class NewsPost extends Component {
  state = {};

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.loadPost(nextProps);
  }

  componentDidMount() {
    this.loadPost(this.props);
  }

  loadPost = (props) => {
    const { match: { params: { postId, action } }, setNotification } = props;

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
    const { match: { params: { action } } } = this.props;

    if (action === 'edit') {
      return <EditNewsPost {...this.props} />;
    }

    const { id, title, body, author, createDate, editDate } = this.state;

    return (
      <div className="section">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h5">{title}</Typography>
            <Typography variant="subtitle2" className="news-author title-text">&nbsp;by {author}</Typography>
            <OptionalTooltip
              title={editDate ? `Edited: ${new Date(editDate).toLocaleString(navigator.language || 'en-US')}` : null}
            >
              <Typography variant="overline" className={editDate ? 'mark-tooltip' : ''}>
                {moment(createDate).format('MMM DD, YYYY')}
              </Typography>
            </OptionalTooltip>
            <IfPerm permission="news.edit">
              <Tooltip title="Edit Post">
                <IconButton color="inherit" onClick={() => push(`/news/${id}/edit`)}>
                  <CreateIcon />
                </IconButton>
              </Tooltip>
            </IfPerm>
          </Toolbar>
        </AppBar>
        <Paper>
          <DraftJSRender contentState={stringToContentState(body)} />
        </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setNotification,
};

export default connect(null, mapDispatchToProps)(NewsPost);
