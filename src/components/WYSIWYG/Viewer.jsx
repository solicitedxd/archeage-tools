import Typography from '@material-ui/core/Typography';
import { Viewer as TUIViewer } from '@toast-ui/react-editor';
import { customHTMLRenderers } from 'components/WYSIWYG/controls';
import React, { Component } from 'react';
import { string } from 'react-proptypes';

class Viewer extends Component {
  static propTypes = {
    value: string.isRequired,
  };

  ref = React.createRef();

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.ref.current.viewerInst.setMarkdown(this.props.value);
    }
  }

  render() {
    const { value } = this.props;
    return value
      ? (
        <Typography component="div" className="body-container">
          <TUIViewer
            ref={this.ref}
            initialValue={value}
            customHTMLRenderer={customHTMLRenderers}
          />
        </Typography>
      )
      : <div />;
  }
}

export default Viewer;
