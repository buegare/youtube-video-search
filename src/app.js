import _ from "lodash";
import React, { Component } from "react";
import SearchBar from "./components/search-bar";
import YTSearch from "youtube-api-search";
import VideoList from "./components/video-list";
import VideoDetail from "./components/video-detail";
import keys from "../config/keys";

const API_KEY = keys.API_KEY;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch("");
  }

  videoSearch(term) {
    YTSearch(
      {
        key: API_KEY,
        term: term
      },
      videos =>
        this.setState({
          videos: videos,
          selectedVideo: videos[0]
        })
    );
  }

  render() {
    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    }, 300);

    return (
      <div>
        <SearchBar onSearchTermChamge={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          videos={this.state.videos}
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
        />
      </div>
    );
  }
}

export default App;
