import React, { Component } from 'react';

import SearchBar from '../components/search-bar';
import VideoList from './video-list';

import Video from '../components/video';
import Navbar from '../components/navbar';
import axios from 'axios';

const API_END_POINT = "https://api.themoviedb.org/3/";
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images";
const API_KEY = "api_key=648b446f533986cb187056a8f06bc218";

const SEARCH_URL = "search/movie?language=fr&include_adult=false";



class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      movieList: {},
      currentMovie: {},
    }
  }

  componentWillMount() {
    this.initMovies();
  }


  initMovies() {
    axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(function(response) {
      this.setState({
        movieList: response.data.results.slice(1,6),
        currentMovie: response.data.results[0]
      }, function() {
        this.applyVideoToCurrentMovie();
      });
    }.bind(this));
  }

  applyVideoToCurrentMovie(){
   axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos`).then(function(response) {
       const youtubeKey = response.data.videos.results[0].key;
       let newCurrentMovieState = this.state.currentMovie;
       newCurrentMovieState.videoId = youtubeKey;
       this.setState({
         currentMovie : newCurrentMovieState
        });
        console.log(this.state.currentMovie);
        console.log(response.data.videos.results[0].key);
   }.bind(this));
  }

  changeVideoHandler(movie) {
    this.setState({currentMovie: movie}, function() {
      this.applyVideoToCurrentMovie();
      this.setRecommendation();
    })
  }

  searchVideoHandler(searchText) {
    if(searchText) {
      axios.get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchText}`).then(function(response) {
        if(response.data && response.data.results[0]) {
          if(response.data.results[0].id !== this.state.currentMovie.id) {
            this.setState({
              currentMovie: response.data.results[0]
            }, () => {
              this.applyVideoToCurrentMovie();
              this.setRecommendation();
            })
          }
        }
      }.bind(this));
    }
  }

  setRecommendation(){
    axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`).then(function(response){
      this.setState({
        movieList: response.data.results.slice(0,5)
      });
    }.bind(this));
  }



  render () {
    const renderVideoList = () => {
      if (this.state.movieList.length >= 5) {
        return <VideoList movieList={this.state.movieList} changedVideo={this.changeVideoHandler.bind(this)}/>
      }
    }

    return (
      <div>
        <h1>NETFLIX REACT</h1>
        <div className="search_bar">
          <SearchBar searchedVideo={this.searchVideoHandler.bind(this)}/>
        </div>
        <div className="row">
          <div className="col-md-8">
            <Video videoId={this.state.currentMovie.videoId}/>
            <Navbar currentMovie={this.state.currentMovie} />
          </div>
          <div className="col-md-4">
            {renderVideoList()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;