import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import {
  addCharacter,
  deleteCharacter,
  renameCharacter,
} from 'actions/myGame';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  arrayOf,
  bool,
  func,
  number,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';

class CharacterDialog extends Component {
  static propTypes = {
    addCharacter: func.isRequired,
    renameCharacter: func.isRequired,
    deleteCharacter: func.isRequired,
    onClose: func.isRequired,
    open: bool.isRequired,
    characters: arrayOf(string),
    characterId: number,
  };

  static defaultProps = {
    characterId: null,
  };

  state = {
    name: '',
    error: null,
  };

  componentDidUpdate(prevProps) {
    const { characterId, characters, open } = this.props;

    if (prevProps.characterId !== characterId || (!prevProps.open && open)) {
      let name = '';
      if (characterId !== null) {
        name = pathOr('', [characterId])(characters);
      }
      this.setState({ name, error: null });
    }
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleDelete = () => {
    const { characterId, characters, deleteCharacter, onClose } = this.props;

    if (characterId !== null && characters.length > characterId) {
      deleteCharacter(characterId);
    }

    onClose();
  };

  handleSave = (e) => {
    const { characterId, characters, addCharacter, renameCharacter, onClose } = this.props;
    let { name } = this.state;

    e.preventDefault();
    name = name.trim();

    if (name.length < 3) {
      this.setState({ error: 'Character name not long enough.' });
      return false;
    }

    if (name.length > 20) {
      this.setState({ error: 'Character name is too long.' });
      return false;
    }

    if (characters.find((c, i) => c.toLowerCase() === name.toLowerCase() && i !== characterId)) {
      this.setState({ error: 'You\'ve already added a character with that name.' });
      return false;
    }

    if (characterId && characters.length > characterId) {
      renameCharacter(characterId, name);
    } else {
      addCharacter(name);
    }

    onClose();
    return false;
  };

  render() {
    const { characters, characterId, open, onClose } = this.props;
    const { name, error } = this.state;
    const characterName = pathOr(null, [characterId])(characters);
    const validChar = !(characterId === null || characterName === null);

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          {!validChar
            ? 'Add Character'
            : `Edit [${characterName}]`}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={this.handleSave}>
            <TextField
              label="Character Name"
              value={name}
              onChange={this.handleChange}
              inputProps={{
                maxLength: 20,
              }}
              autoFocus
              error={Boolean(error)}
              helperText={error}
            />
          </form>
        </DialogContent>
        <DialogActions>
          {validChar &&
          <Button onClick={this.handleDelete} classes={{ label: 'text-red' }}>Delete</Button>}
          <Button onClick={onClose}>Cancel</Button>
          <Button color="primary" onClick={this.handleSave}>Confirm</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ myGame: { characters } }) => ({
  characters,
});

const mapDispatchToProps = {
  addCharacter,
  deleteCharacter,
  renameCharacter,
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDialog);
