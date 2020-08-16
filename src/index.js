import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY="AIzaSyDFvCE1je0jajndQHjR41bn3ibeLrQJgmM";



//Create a new component. This component should produce some HTML.

class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('Blockchain');
  }

  


  videoSearch(term) {
    YTSearch({key:API_KEY, term:term}, (data) => {
      this.setState({
        videos: data,
        selectedVideo: data[0]
      });
    });
  }

  render() 
  {

    const videoSearch =_.debounce( (term) => { this.videoSearch(term)}, 1000);

    return ( 
  <div> 
    <SearchBar onSearchTermChange={term => this.videoSearch(term)}/>
    <VideoDetail video={this.state.selectedVideo} />
    <VideoList 
      onVideoSelect={video => this.setState({selectedVideo: video})}
      videos={this.state.videos} />
  </div>
  );
  }
}

//Take this component's generated HTML and put it on the page (in the DOM)

ReactDOM.render(<App />, document.getElementById('root'));