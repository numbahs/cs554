import React, { Component } from 'react';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serachQuery: ""
    }
  }

  onSubmit = e => {
    e.preventDefault();
    if(this.state.searchQuery) {
      this.props.onSearch(this.state.searchQuery);
    }
  }
  
  onSearchQueryChange = e => {
    this.setState({
      searchQuery: e.target.value
    })
  }

  render() {
    console.log("RERENDERING");
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="superheroName">
            What superhero do you want to search for?
          </label>
          <input 
            type="text" 
            value={this.state.searchQuery}
            onChange={this.onSearchQueryChange}
            className="form-control" 
            id="superheroName"
            aria-describedby="superheroHelp" 
            placeholder="Superhero..." 
          />
          <small id="superheroHelp" className="form-text text-muted">
            Everyone has a favorie superhero; which do you want to search for?
          </small>
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>
    )
  }
}

export default SearchForm;