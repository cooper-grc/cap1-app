/*
Created by Cooper Grace on 3/4/2020 for Capital One SWS Challenge
Favicon image link: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hiclipart.com%2Ffree-transparent-background-png-clipart-dobxa&psig=AOvVaw3iHdmrj9AWNSulCtIN-amF&ust=1583799552793000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMDqjNqdjOgCFQAAAAAdAAAAABAD
*/

import React, { Component } from 'react';
import MapContainer from './mapContainer.js'
import axios from "axios";
import { Marker } from 'google-maps-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Navbar, ButtonToolbar } from 'react-bootstrap';


class App extends Component {
  constructor(){
    super()
    this.state = {
      myLatLng: {
        lat: 49.8527,
        lng: -123.1207
      },
      markers: [],
      currentSearch: "",
      cards: [],
      shownMarker: {
        lat: 0,
        lng: 0
      }
    }
  }
  /*
  Gets users location via HTML5 Geolocation
  */
  getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                    myLatLng: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                }
            );
        })
    } else {
        //If geolocation doesn't work set location to vancover
        this.setState({
                myLatLng: {
                    lat: 49.8527,
                    lng: -123.1207
                }
            }
        );
    }
  }

  /*
  Searches for restuarants around user's location using given search term and Yelp's Fusion API
  */
  search = term => {

    axios
    .get("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=" + this.state.myLatLng["lat"] + "&longitude=" + this.state.myLatLng["lng"] + "&term=" + term, {headers: {'Authorization': 'Bearer API_KEY'}})
    .then(res => {
      let markers = [];
      let businesses = res.data.businesses;
        let test = businesses.map((business, index) => {
          return <div key={index}>
            <p>{business.name}</p>
            <p>Lng: {business.coordinates.longitude}</p>
          </div>
        })
        let infoArr = [];
        infoArr = businesses.map((business, index) => {
          console.log(business.name)
          return <Card.Body key = {index} id={index} info={{
            name: business.name,
            image: business.image_url,
            url: business.url,
            alias: "https://www.yelp.com/map/"+business.alias
          }} 
          ></Card.Body>
        })

        let tempArr = [];
        tempArr = businesses.map((business, index) => {
          console.log(business.coordinates.latitude)
          console.log(business.coordinates.longitude)
          return <Marker key={index} id={index} position={{
           lat: business.coordinates.latitude,
           lng: business.coordinates.longitude
         }}
         onClick={() => console.log("You clicked me!")} />
        })
        let shownMarker = tempArr[0];
        console.log(tempArr)
  
      this.setState({
        markers: tempArr,
        cards: infoArr,
        shownMarker: shownMarker
      })
    })

  }

  locate = () => {
    console.log("locate")
    this.setState({
      shownMarker: this.state.markers[3]
    })
    console.log(this.state.shownMarker)
  }


  componentDidMount(){
    this.getLocation();
  }

  handleSearchChange = e => {
    this.setState({
      currentSearch: e.target.value
    })
  }

  handleSearchSubmit = e => {
    this.search(this.state.currentSearch);
    e.preventDefault();
  }


  render() {
    let infoCards = []
    infoCards = this.state.cards
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
      <div>
      <Navbar expand="lg" bg="primary" variant="dark">
      <Navbar.Brand href="#home">Food Finder</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Navbar>
    </div>
      <div style={{display: 'flex', flexDirection: 'row'}}>
      <div class="text-center" style={{width : "50vw", justifyContent: 'center', border: "primary", align: "center"}}>
        <form onSubmit={this.handleSearchSubmit}>
        <input type="text" value={this.state.currentSearch} onChange={this.handleSearchChange} style={{
          fintSize: 24,
          distplay: 'block',
          width: "65%",
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16
        }} placeholder="Input what type of food you're in the mood for and press enter" />
        </form>
          {infoCards.map((infoCard, index) => {
              console.log(infoCard.props.info.name)
              return (<Card style={{ width: '50%', marginLeft: '25%', marginRight: '25%'}}><Card.Img variant="top" src={infoCard.props.info.image} />
            <Card.Body>
            <Card.Title>{infoCard.props.info.name}</Card.Title>
            <ButtonToolbar>
            <Button href={infoCard.props.info.url} variant="danger">Yelp Page</Button>
            <Button variant="primary" href={infoCard.props.info.alias}>Directions</Button>
            </ButtonToolbar>
          </Card.Body>
          </Card>
          )
            }
          )}
      </div>
      <div style={{width: "50vw"}}>
      <MapContainer coords={this.state.myLatLng} markers={this.state.markers}/>
      </div>
      </div>
      </div>
    );
}
}

export default App;