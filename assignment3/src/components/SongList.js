import React, { Component } from "react";

import SongListEntry from "./SongListEntry"

class SongList extends Component {
  render() {
    const { songList } = this.props;
    return (
      <div className="d-flex">
        {songList.map(song => {
          return (
            <SongListEntry song={song} key={song.id} />
          );
        })}
      </div>);
  }
}

export default SongList;
