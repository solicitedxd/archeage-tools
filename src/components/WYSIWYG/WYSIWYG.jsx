import {
  customControls,
  EDITOR_TYPE,
  inlineToolbar,
  toolbar,
} from 'components/WYSIWYG/controls';
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
    label: string,
    type: oneOf(Object.values(EDITOR_TYPE)).isRequired,
  };

  static defaultProps = {
    value: null,
    onSave: null,
  };

  ref = React.createRef();

  render() {
    const { value, onSave, type, ...otherProps } = this.props;
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
          onSave={onSave}
        />
      </div>
    );
  }
}

export default WYSIWYG;
