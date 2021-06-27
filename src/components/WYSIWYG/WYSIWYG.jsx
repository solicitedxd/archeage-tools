import {
  Button,
  Typography,
} from '@material-ui/core';
import { Editor } from '@toast-ui/react-editor';
import cn from 'classnames';
import {
  EDITOR_TYPE,
  toolbar,
} from 'components/WYSIWYG/controls';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  bool,
  func,
  number,
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
    noMargin: bool,
    maxLength: number,
    height: string,
    getCharCount: func,
  };

  static defaultProps = {
    value: '',
    onSave: null,
    noMargin: false,
    maxLength: 0,
    height: '240px',
  };

  state = {
    remChars: null,
  };

  ref = React.createRef();

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.ref.current.editorInst.setMarkdown(this.props.value);
    }
  }

  handleSave = () => {
    const { onSave } = this.props;

    if (onSave) {
      onSave(this.ref.current.editorInst.getMarkdown());
    }
  };

  onChange = () => {
    const { maxLength, getCharCount } = this.props;
    let text = pathOr('', ['current', 'editorInst', 'wwEditor', 'el', 'innerText'])(this.ref);
    // remove line breaks
    text = text.trim();
    text = text.replaceAll('\r', '');
    text = text.replaceAll('\n', '');
    const chars = text.length;

    const remChars = maxLength > 0 && this.ref.current !== null
      ? Math.max(0, maxLength - chars)
      : maxLength;
    if (this.ref.current) {
      this.setState({ remChars });
    }
    if (getCharCount) {
      getCharCount(chars);
    }
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { value, onSave, type, onCancel, noMargin, maxLength, ...otherProps } = this.props;
    const { remChars } = this.state;

    return (
      <div className={cn('editor-container', { 'no-margin': noMargin })}>
        <Editor
          ref={this.ref}
          initialEditType="wysiwyg"
          usageStatistics={false}
          hideModeSwitch={true}
          initialValue={value}
          toolbarItems={toolbar[type]}
          {...otherProps}
          onChange={this.onChange}
        />
        <div className="buttons">
          {maxLength > 0 &&
          <Typography className={cn('rem-chars', { 'none': remChars === 0 })} variant="body2">
            Remaining Characters: {remChars || maxLength}
          </Typography>}
          {onCancel &&
          <Button onClick={onCancel}>
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
