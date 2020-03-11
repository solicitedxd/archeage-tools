import { Button } from '@material-ui/core';
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
  func,
  oneOf,
  string,
} from 'react-proptypes';

class WYSIWYG extends Component {
  static propTypes = {
    value: string,
    onSave: func,
    onCancel: func,
    label: string,
    type: oneOf(Object.values(EDITOR_TYPE)).isRequired,
  };

  static defaultProps = {
    value: null,
    onSave: null,
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
      onSave(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    }
  };

  render() {
    const { value, onSave, type, onCancel, ...otherProps } = this.props;
    return (
      <div className="editor-container">
        <Editor
          {...otherProps}
          ref={this.ref}
          controls={toolbar[type]}
          customControls={customControls(this.ref)}
          inlineToolbar={true}
          inlineToolbarControls={inlineToolbar[type]}
          value={value}
          onChange={this.setEditorState}
        />
        <div className="buttons">
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
