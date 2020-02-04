import React, { Component } from "react";
import api from "../api/api";
import SearchRes from "./SearchRes";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import { Input } from "@material-ui/core";
import "./Search.css";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Card from "@material-ui/core/Card";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      city: "",
      latLon: [],
      userLatLon: [],
      localWeather: "",
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
    this.getWeather([userLat, userLon], this.state.loading);
    console.log(this.state.loading, "userLatLon");
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
        <h3>Weather</h3>
        <div className="search-bar">
          <Paper component="form" className="root" elevation={3}>
            <form onSubmit={this.submitSearch.bind(this)}>
              <InputBase
                className="input"
                placeholder="Search Google Maps"
                inputProps={{ "aria-label": "search google maps" }}
                onChange={this.handleChange}
                value={this.state.city}
              />
              <IconButton
                type="submit"
                className="iconButton"
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </form>
            <Divider className="divider" orientation="horizontal" />
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
            <div>
              Local Temperature:{" "}
              {JSON.stringify(this.state.localWeather.temperature)} °F
            </div>
            <div>
              Forecast: {JSON.stringify(this.state.localWeather.summary)}
            </div>
          </Card>
        )}

        <SearchRes latLon={this.state.latLon} loading={this.state.loading} />
      </div>
    );
  }
}

export default Search;
