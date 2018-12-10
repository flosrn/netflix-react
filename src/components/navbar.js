import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import VideoDetail from '../components/video-detail';

class Navbar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      key: 1
    }
  }

  handleSelect(key) {
    this.setState({ key });
  }

  render() {
    
    return (

      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
        <Tab eventKey={1} title="Synopsis">
          <VideoDetail currentMovie={this.props.currentMovie}/>
        </Tab>
        <Tab eventKey={2} title="Info">
          <ul>
            <li>{this.props.currentMovie.vote_average * 10}% note des utilisateurs</li>
            <li>{this.props.currentMovie.vote_count} votes</li>
            <li>Titre original: {this.props.currentMovie.original_title}</li>
            <li>Date de sortie: {this.props.currentMovie.release_date}</li>
          </ul>
        </Tab>
      </Tabs>
    );
  }
}



export default Navbar;
// render(<Navbar />);