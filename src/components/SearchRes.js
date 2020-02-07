import React, { Component } from "react";
import "./SearchRes.css";
import Card from "@material-ui/core/Card";

class SearchRes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latLon: props.latLon,
      res: "",
      loading: props.loading
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
      .then(res => this.setState({ res: res, loading: false }))
      .then(res => console.log(this.state, "state in getWeather after"));
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    const [prevLat, prevLon] = prevProps.latLon;
    const [currLat, currLon] = this.props.latLon;
    if (currLat !== prevLat && currLon !== prevLon) {
      this.getWeather([currLat, currLon]);
      setInterval(() => {
        // this.setState({ loading: "True" });
        this.getWeather([currLat, currLon]);
      }, 60000);
    }
  }

  render() {
    return (
      <div>
        {/* {this.state.loading === true && <Spinner />} */}
        {this.state.res !== "" && (
          <Card className="card-info">
            <div className="forecast">
              <div className="current forecast">
                Current Forecast:{" "}
                {JSON.stringify(this.state.res.currently.summary)}
              </div>
              <div className="hourly forecast">
                Hourly Forecast: {JSON.stringify(this.state.res.hourly.summary)}
              </div>
              <div className="daily forecast">
                Daily Forecast: {JSON.stringify(this.state.res.daily.summary)}
              </div>
            </div>
            <div className="temperature">
              {JSON.stringify(this.state.res.currently.temperature)} °F
            </div>
          </Card>
        )}
      </div>
    );
  }
}

export default SearchRes;
