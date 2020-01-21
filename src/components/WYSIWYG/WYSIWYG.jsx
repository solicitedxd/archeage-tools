import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  func,
  string,
} from 'react-proptypes';

class WYSIWYG extends Component {
  static propTypes = {
    initialState: string,
    editorState: string,
    onChange: func,
    label: string,
  };

  static defaultProps = {
    editorState: null,
    onChange: null,
  };

  render() {
    const { editorState, onChange, label, ...otherProps } = this.props;

    return (
      <div>
        <Editor
          {...otherProps}
          // controls={['heading', 'bold', 'italic', 'underline', 'strikethrough', 'numberList', 'bulletList', 'clear']}
          // customControls={[
          //  ...standardControls,
          // ]}
          // inlineToolbar
          initialContentState={editorState}
          // onChange={(contentState) => onChange(JSON.stringify(convertToRaw(contentState.getCurrentContent())))}
          onContentStateChange={onChange}
          // label={label}
        />
      </div>
    );
  }
}

export default WYSIWYG;
