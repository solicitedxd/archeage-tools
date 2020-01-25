import {
  AppBar,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  Autocomplete,
  Skeleton,
} from '@material-ui/lab';
import { searchItems } from 'actions/gameData';
import { push } from 'actions/navigate';
import Item from 'components/Item';
import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const searchTypes = [
  { label: 'Product', value: 'product' },
  { label: 'Material', value: 'material' },
];

class FolioHeader extends Component {
  state = {
    open: false,
    loading: false,
    searchType: searchTypes[0].value,
    query: '',
    options: [],
  };

  setOpen = (open) => {
    this.setState({ open });
  };

  handleTypeChange = (e, searchType) => {
    const { query } = this.state;
    this.setState({ searchType }, () => {
      if (query) {
        this.handleQuery(e, query);
      }
    });
  };

  handleQuery = (queryInput, pastQuery) => {
    const query = pastQuery || queryInput;
    if (query.length < 3) {
      this.setState({ options: [], query });
    } else {
      this.setState({ loading: true, query });
      this.props.searchItems(query, this.state.searchType)
      .then((data) => {
        this.setState({ options: data, loading: false });
      })
      .catch(() => {
        this.setState({ options: [], loading: false });
      });
    }
  };

  _handleQuery = debounce(this.handleQuery, 200);

  handleSearch = (e, item) => {
    const { searchType } = this.state;
    if (!item) return;

    push(`/folio/search-${searchType}?itemId=${item.id}`);
  };

  render() {
    const { open, loading, searchType, options } = this.state;
    const { items, mobile } = this.props;

    return (
      <AppBar position="static" className="section folio-header">
        <Toolbar variant="dense">
          {!mobile &&
          <Typography variant="h4" className="title-text">Folio</Typography>}
          <Autocomplete
            open={open}
            onOpen={() => this.setOpen(true)}
            onClose={() => this.setOpen(false)}
            onChange={this.handleSearch}
            loading={loading}
            options={options}
            getOptionLabel={option => option.name}
            filterOptions={(options) => options}
            classes={{
              noOptions: 'folio-no-option',
            }}
            renderOption={option => (
              <div className="item-result" key={option.id}>
                <Item id={option.id} inline />
                {items[option.id]
                  ? <Typography variant="body2">{items[option.id].name}</Typography>
                  : <Skeleton variant="text" />}
              </div>
            )}
            freeSolo
            onInputChange={(e, value) => {
              this._handleQuery(value);
            }}
            renderInput={params => (
              <TextField
                {...params}
                label={`Search by ${searchTypes.find(type => type.value === searchType).label}`}
                fullWidth
                variant="standard"
                size="small"
                margin="none"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
                InputLabelProps={{
                  ...params.InputLabelProps,
                }}
              />
            )}
          />
          <RadioGroup name="search-type" value={searchType} onChange={this.handleTypeChange} row={!mobile}>
            {searchTypes.map(searchType => (
              <FormControlLabel
                control={<Radio size="small" color="primary" />}
                {...searchType}
                key={searchType.value}
              />
            ))}
          </RadioGroup>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = ({ gameData: { items }, display: { mobile } }) => ({
  items,
  mobile,
});

const mapDispatchToProps = {
  searchItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(FolioHeader);
