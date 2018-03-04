import React, { Component } from "react";

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      orderByPop: false
    };
  }

  onSearchQueryChange = e => {
    this.setState({
      searchQuery: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery) {
      this.props.onSearch(this.state.searchQuery, this.state.orderByPop);
    }
  };

  toggleNameOrdering = e => {
    this.setState({
      orderByPop: e.target.checked
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="songName">
            Search for a song.
          </label>
          <input
            type="text"
            value={this.state.searchQuery}
            onChange={this.onSearchQueryChange}
            className="form-control"
            id="songName"
            aria-describedby="songHelp"
            placeholder="Put a song here!"
          />
          <small id="songHelp" className="form-text text-muted">
            What song do you want to search for today?
          </small>
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={this.state.orderByPop}
              onChange={this.toggleNameOrdering}
            />
            Order results by popularity
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Search for song
        </button>
      </form>
    );
  }
}

export default SearchForm;
