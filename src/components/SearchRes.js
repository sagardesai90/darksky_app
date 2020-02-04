import React, { Component } from "react";
import "./SearchRes.css";
import Card from "@material-ui/core/Card";

class SearchRes extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    return (
      <div>
        {/* <div className="card">{JSON.stringify(this.state.latLon)}</div> */}
        {this.state.res !== "" && (
          <Card className="card-info">
            <div>
              Temperature:{" "}
              {JSON.stringify(this.state.res.currently.temperature)} °F
            </div>
            <div>
              Current Forecast:{" "}
              {JSON.stringify(this.state.res.currently.summary)}
            </div>
            <div>
              Hourly Forecast: {JSON.stringify(this.state.res.hourly.summary)}
            </div>
            <div>
              Daily Forecast: {JSON.stringify(this.state.res.daily.summary)}
            </div>
          </Card>
        )}
      </div>
    );
  }
}

export default SearchRes;