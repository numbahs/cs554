import React, { Component } from 'react';
import Axios from 'axios';
import SuperHeroList from './SuperHeroList';

class SuperHeroListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfMatchingHeroes: []
    };
  }

  getSearchResults = async query => {
    const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&apikey=bce7132e6680ab01fe92e386ca9bdf2a`
    const httpResponse = await Axios.get(url);

    return httpResponse.data.data.results;
  }

  componentDidMount = async props => {
    if(this.props.superHero) {
      const matches = await this.getSearchResults(props.superHero);
      this.setState({
        listOfMatchingHeroes: matches
      });
    }
  };

  componentWillReceiveProps = async newProps => {
    if(newProps.superHero && newProps.superHero !== this.props.superHero) {
      const matches = await this.getSearchResults(
        newProps.superHero, 
        newProps.orderById
      );

      this.setState({
        listOfMatchingHeroes: matches
      })
    }
  };

  render() {
    if(!this.props.superHero) {
      return <h1>Search for Someone</h1>
    }

    const heroes = [...this.state.listOfMatchingHeroes];
    
    if(this.state.orderById) {
      heroes.sort((x, y) => {
        if(x.id < y.id) return 1;
        if(x.id > y.id) return -1;
        return 0;
      });
    }

    return <SuperHeroList heroList={heroes} />
  }
}

export default SuperHeroListContainer;