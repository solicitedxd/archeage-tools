import {
  Button,
  Typography,
} from '@material-ui/core';
import cn from 'classnames';
import {
  customControls,
  EDITOR_TYPE,
  inlineToolbar,
  toolbar,
} from 'components/WYSIWYG/controls';
import { convertToRaw } from 'draft-js';
import Editor from 'mui-rte';
import React, { Component } from 'react';
import {
  bool,
  func,
  number,
  oneOf,
  string,
} from 'react-proptypes';
import {
  getCharCountOfContentState,
  stringToContentState,
} from 'utils/string';

class WYSIWYG extends Component {
  static propTypes = {
    value: string,
    onSave: func,
    onCancel: func,
    label: string,
    type: oneOf(Object.values(EDITOR_TYPE)).isRequired,
    noMargin: bool,
    maxLength: number,
  };

  static defaultProps = {
    value: null,
    onSave: null,
    noMargin: false,
    maxLength: 0,
  };

  state = {
    editorState: null,
  };

  ref = React.createRef();

  setEditorState = (editorState) => {
    this.setState({ editorState });
  };

  handleSave = () => {
    const { editorState } = this.state;
    const { onSave } = this.props;
    if (onSave) {
      if (editorState) {
        onSave(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
      } else {
        onSave(stringToContentState());
      }
    }
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { value, onSave, type, onCancel, noMargin, maxLength, ...otherProps } = this.props;
    const { editorState } = this.state;

    const remChars = maxLength > 0 && editorState !== null
      ? Math.max(0, maxLength - getCharCountOfContentState(editorState.getCurrentContent()))
      : maxLength;

    return (
      <div className={cn('editor-container', { 'no-margin': noMargin })}>
        <Editor
          {...otherProps}
          ref={this.ref}
          controls={toolbar[type]}
          customControls={customControls(this.ref)}
          inlineToolbar={true}
          inlineToolbarControls={inlineToolbar[type]}
          value={value}
          onChange={this.setEditorState}
          maxLength={maxLength > 0 ? maxLength : null}
        />
        <div className="buttons">
          {maxLength > 0 &&
          <Typography className={cn('rem-chars', { 'none': remChars === 0 })} variant="body2">
            Remaining Characters: {remChars}
          </Typography>}
          {onCancel &&
          <Button
            onClick={onCancel}
          >
            Cancel
          </Button>}
          <Button
            color="primary"
            onClick={this.handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
}

export default WYSIWYG;
