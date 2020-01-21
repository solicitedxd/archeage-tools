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
import OptionalTooltip from 'components/OptionalTooltip';
import EditNewsPost from 'components/pages/Home/EditNewsPost';
import { mapEntityTransform } from 'components/WYSIWYG/controls';
import config from 'config';
import draftToHtml from 'draftjs-to-html';
import moment from 'moment';
import React, { Component } from 'react';
import { substitute } from 'utils/string';
import xhr from 'utils/xhr';

class NewsPost extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {};

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.loadPost(nextProps);
  }

  componentDidMount() {
    this.loadPost(this.props);
  }

  loadPost = (props) => {
    const { match: { params: { postId, action } } } = props;

    if (action !== 'edit') {
      xhr.get(substitute(config.endpoints.service.newsPost, { postId }))
      .then(({ data }) => {
        this.setState({ ...data, body: JSON.parse(data.body) });
      });
    }
  };

  render() {
    const { match: { params: { action } } } = this.props;

    if (action === 'edit') {
      return <EditNewsPost {...this.props} />;
    }

    const { id, title, body, author, createDate, editDate } = this.state;
    console.log(body);
    console.log(draftToHtml(body, {}, false, mapEntityTransform));

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
            <Tooltip title="Create New Post">
              <IconButton color="inherit" onClick={() => push(`/news/${id}/edit`)}>
                <CreateIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Paper>
          <Typography
            component="div"
            className="body-container"
            dangerouslySetInnerHTML={{
              __html: draftToHtml(body, {}, false, mapEntityTransform),
            }}
          />
        </Paper>
      </div>
    );
  }
}

export default NewsPost;
