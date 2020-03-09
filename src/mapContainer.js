/*
Created by Cooper Grace on 3/4/2020 for Capital One SWE Challenge
*/

import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
    width: '50%',
    height: '90%',
  };

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: this.props.markers,
      newMarkers: []
    }
  }
  
  static defaultProps = {
    center: {lat: 47.444, lng: -122.176}, 
    zoom: 13
 }

/*
Renders markers of nearest restaurants on map centered on user's location
*/
  render() {
    let markers = []
    if(this.props.markers[19]){
      console.log("defined!")
      
      markers = this.props.markers.map((marker, index) => {
        return <Marker key={index} lat={marker.props.position.lat} lng={marker.props.position.lng} ></Marker>
      })
    }
    return (
        <Map
          google={this.props.google}
          zoom={this.props.zoom}
          style={mapStyles}
          initialCenter={this.props.coords}
        >
        {this.props.markers}
        </Map>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: 'API_KEY'
    })(MapContainer);