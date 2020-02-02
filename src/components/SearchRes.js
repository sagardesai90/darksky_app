import React, { Component } from "react";
import API from "../api/api";

class SearchRes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      saved: false,
      latLon: props.latLon,
      res: ""
    };
  }

  async getWeather(latLon) {
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
      .then(res => this.setState({ res: res }))
      .then(res => console.log(this.state, "state"));
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    const [prevLat, prevLon] = prevProps.latLon;
    const [currLat, currLon] = this.props.latLon;
    if (currLat !== prevLat && currLon !== prevLon) {
      this.getWeather([currLat, currLon]);
    }
  }

  render() {
    return <div className="card">{JSON.stringify(this.state.latLon)}</div>;
  }
}

export default SearchRes;
