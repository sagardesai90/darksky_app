import React, { Component } from "react";
import api from "../api/api";
import api2 from "../api/api2";
import SearchRes from "./SearchRes";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import { Input } from "@material-ui/core";
import "./Search.css";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import Card from "@material-ui/core/Card";

import Typist from "react-typist";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      city: "",
      latLon: [],
      userLatLon: [],
      localWeather: "",
      userLocation: "",
      loading: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
  }

  handleChange(event) {
    this.setState({ city: event.target.value });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getCoordinates(position) {
    let userLat = position.coords.latitude;
    let userLon = position.coords.longitude;
    this.setState({
      userLatLon: [userLat, userLon],
      loading: true
    });
    api2.revGeocode([userLat, userLon]).then(res => {
      console.log(res.results[0].locations[0], "res");
      this.setState({
        userLocation: res.results[0].locations[0]
      });
    });
    this.getWeather([userLat, userLon], this.state.loading);
    console.log(this.state.userLocation, "userLatLon");
  }

  async getWeather(latLon, loading) {
    const [lat, lon] = latLon;
    return fetch(`http://localhost:3001/forecast?lat=${lat}&lon=${lon}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors"
      }
    })
      .then(res => res.json())
      .then(res =>
        this.setState({ localWeather: res.currently, loading: false })
      )
      .then(res => console.log(this.state, "state in Search.js"));
  }

  submitSearch = event => {
    event.preventDefault();
    this.setState({ loading: true });
    let city = this.state.city.trim();
    api.geocode(city).then(res => {
      const { lat, lng } = res.results[0].locations[0].latLng;
      this.setState({
        city,
        latLon: [lat, lng]
      });
      console.log(this.state, "state in submitSearch");
    });
  };

  component;

  render() {
    return (
      <div>
        <h3>Darksky Weather</h3>
        <Typist className="myTypist">
          <span>San Francisco</span>
          <Typist.Backspace count={13} delay={200} />
          <span>30 Rock NYC</span>
          <Typist.Backspace count={11} delay={200} />
          <span>Google Mountain View</span>
          <Typist.Backspace count={20} delay={200} />
          <span>Type any address...</span>
        </Typist>
        <div className="search-bar">
          <Paper component="form" className="root" elevation={3}>
            {/* <IconButton className="iconButton" aria-label="menu">
              <MenuIcon />
            </IconButton> */}
            <form onSubmit={this.submitSearch.bind(this)} className="form">
              <InputBase
                className="input"
                placeholder="Search Mapquest"
                inputProps={{ "aria-label": "search Mapquest" }}
                onChange={this.handleChange}
                value={this.state.city}
              />
              <IconButton
                type="submit"
                className="formIconButton"
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </form>
            <Divider className="divider" orientation="vertical" />
            <IconButton
              color="primary"
              className="iconButton"
              aria-label="directions"
            >
              <MyLocationIcon className="loc-icon" onClick={this.getLocation} />
            </IconButton>
          </Paper>
        </div>
        {this.state.localWeather !== "" && (
          <Card className="local-weather">
            <div className="forecast">
              <div className="userLocation">
                {JSON.stringify(this.state.userLocation.adminArea5)},{" "}
                {JSON.stringify(this.state.userLocation.adminArea3)}
              </div>
              <div>
                Forecast: {JSON.stringify(this.state.localWeather.summary)}
              </div>
            </div>
            <div className="temp">
              {JSON.stringify(this.state.localWeather.temperature)} °F
            </div>
          </Card>
        )}

        <SearchRes latLon={this.state.latLon} loading={this.state.loading} />
      </div>
    );
  }
}

export default Search;
