import React, { Component } from "react";

class SongListEntry extends Component {

  checkSong = preview => {
    if (preview) {
      return <audio ref="audio" src={preview} controls></audio>
    }
    return <div>No preview available</div>
  }

  render() {
    const { song } = this.props
    return (
      <div className="card col-sm-12 col-md-6 col-lg-4">
        {song.album.images ? <img className="card-img-top" src={song.album.images[0].url} alt={`${song.album.name} Album Cover`} /> : <div>No Image Available</div>}
        <div className="card-body">
          <div className="card-title">{song.name}</div>
          <div className="card-body">
            <div>
              <a href={song.artists[0].external_urls.spotify}>Artist: {song.artists[0].name}</a>
            </div>
            <div>
              <a href={song.album.external_urls.spotify}>Album: {song.album.name}</a>
            </div>
            <div>Popularity: {song.popularity}</div>
            {this.checkSong(song.preview_url)}
          </div>
        </div>
      </div>
    );
  }
}

export default SongListEntry;
