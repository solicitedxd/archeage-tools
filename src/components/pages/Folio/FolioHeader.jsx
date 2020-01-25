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
import { push } from 'actions/navigate';
import Item from 'components/Item';
import config from 'config';
import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import xhr from 'utils/xhr';

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

  handleQuery = (e, pastQuery) => {
    const query = pastQuery || e.target.value;
    if (query.length < 3) {
      this.setState({ options: [], query });
    } else {
      const endpoint = (this.state.searchType === searchTypes[0].value) ? config.endpoints.service.searchByProduct
        : config.endpoints.service.searchByMaterial;
      this.setState({ loading: true, query });
      xhr.get(`${endpoint}?query=${query}`)
      .then(({ data }) => {
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
            options={options}
            getOptionLabel={option => option.name}
            renderOption={option => (
              <div className="item-result">
                <Item id={option.id} inline />
                {items[option.id]
                  ? <Typography variant="body2">{items[option.id].name}</Typography>
                  : <Skeleton variant="text" />}
              </div>
            )}
            freeSolo
            renderInput={params => (
              <TextField
                {...params}
                label={`Search by ${searchTypes.find(type => type.value === searchType).label}`}
                fullWidth
                variant="standard"
                size="small"
                margin="none"
                onChange={(e) => {
                  e.persist();
                  this._handleQuery(e);
                }}
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
              <FormControlLabel control={<Radio size="small" color="primary" />} {...searchType}
                                key={searchType.value} />
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

export default connect(mapStateToProps)(FolioHeader);
