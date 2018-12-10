import React, { Component } from 'react';

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      placeHolder: "Tapez votre film...",
      intervalBeforerequest: 1000,
      lockRequest: false
    }
  }


  render () {
    return (
      <div className="row">
        <div className="col-lg-8 input-group">
          <input type="text" className="form-control input-lg" onChange={this.handleChange.bind(this)} placeholder={this.state.placeHolder}/>
          
        </div>
      </div>
    )
  }

  handleChange(event) {
    this.setState({
      searchText: event.target.value
    });
    if(!this.state.lockRequest) {
      this.setState({
        lockrequest: true
      })
      setTimeout(function() {
        this.search()
      }.bind(this), this.state.intervalBeforeRequest)
    }
  } 

  search() {
    this.props.searchedVideo(this.state.searchText);
    this.setState({
      lockRequest: false
    })
  }
}

export default SearchBar;