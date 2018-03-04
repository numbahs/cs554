import React, { Component } from 'react';
import SearchForm from './SearchForm';
import SongListContainer from './SongListContainer';
import '../css/App.css'
import { auth } from '../utility/spotifyApi'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: "",
      orderByPop: false,
      songList: []
    };
  }

  onSearch = (searchQuery, orderByPop) => {
    this.setState({
      song: searchQuery,
      orderByPop
    });
  };

  updateSongs = songList => {
    this.setState({ songList });
  }

  finishAuth = async callBack => {
    const { access_token, expires_in } = await auth();
    this.setState({ access_token, expires_in }, callBack);
  };

  componentDidMount = async () => {
    await this.finishAuth();
  };

  render() {
    const { access_token, song, orderByPop, songList } = this.state;
    if (!access_token) {
      return (
        <div className="App">
          <div className="container">
            Loading...
          </div>
        </div>
      )
    }

    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <SearchForm
                onSearch={this.onSearch} />
            </div>
          </div>
          <div className="container">
            <SongListContainer token={access_token} orderByPop={orderByPop}
              searchQuery={song} updateSongs={this.updateSongs} songList={songList} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
