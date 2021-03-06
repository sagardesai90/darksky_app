import React, { Component } from "react";
import "./SearchRes.css";
import Card from "@material-ui/core/Card";
import ReactAnimatedWeather from "react-animated-weather";

class SearchRes extends Component {
  constructor(props) {
    console.log(props, "props in SearchRes");
    super(props);
    this.state = {
      latLon: props.latLon,
      res: "",
      loading: props.loading,
      streetAddress: props.streetAddress
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
      .then(res =>
        console.log(this.state.res.currently, "state in getWeather after")
      )
      .catch(err => console.log(err, "err"));
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    const [prevLat, prevLon] = prevProps.latLon;
    const [currLat, currLon] = this.props.latLon;
    if (currLat !== prevLat && currLon !== prevLon) {
      this.getWeather([currLat, currLon]);
      setInterval(() => {
        this.getWeather([currLat, currLon]);
      }, 60000);
    }
  }

  render() {
    return (
      <div>
        {this.state.res !== "" && (
          <Card className="card-info">
            <div className="forecast">
              <div className="current forecast">
                Local Forecast:{" "}
                {JSON.stringify(this.state.res.currently.summary).replace(
                  /"/g,
                  ""
                )}
              </div>
            </div>

            <ReactAnimatedWeather
              icon={this.state.res.currently.icon
                .toUpperCase()
                .replace(/-/g, "_")}
              color="goldenrod"
              size="50"
              animate="true"
              className="icon"
            />
            <div>
              <div className="hourly forecast">
                Hourly Forecast:{" "}
                {JSON.stringify(this.state.res.hourly.summary).replace(
                  /"/g,
                  ""
                )}
              </div>
            </div>
            <div className="temperature">
              {JSON.stringify(this.state.res.currently.temperature).replace(
                /"/g,
                ""
              )}{" "}
              °F
            </div>
            <div className="daily forecast">
              Daily Forecast:{" "}
              {JSON.stringify(this.state.res.daily.summary).replace(/"/g, "")}
            </div>
            <div className="weekly">
              <div>
                <ReactAnimatedWeather
                  icon={this.state.res.daily.data[0].icon
                    .toUpperCase()
                    .replace(/-/g, "_")}
                  color="goldenrod"
                  size="50"
                  animate="true"
                  className="icon"
                />
                <p>S</p>
              </div>
              <div>
                <ReactAnimatedWeather
                  icon={this.state.res.daily.data[1].icon
                    .toUpperCase()
                    .replace(/-/g, "_")}
                  color="goldenrod"
                  size="50"
                  animate="true"
                  className="icon"
                />
                <p>M</p>
              </div>
              <div>
                <ReactAnimatedWeather
                  icon={this.state.res.daily.data[2].icon
                    .toUpperCase()
                    .replace(/-/g, "_")}
                  color="goldenrod"
                  size="50"
                  animate="true"
                  className="icon"
                />
                <p>T</p>
              </div>
              <div>
                <ReactAnimatedWeather
                  icon={this.state.res.daily.data[3].icon
                    .toUpperCase()
                    .replace(/-/g, "_")}
                  color="goldenrod"
                  size="50"
                  animate="true"
                  className="icon"
                />
                <p>W</p>
              </div>
              <div>
                <ReactAnimatedWeather
                  icon={this.state.res.daily.data[4].icon
                    .toUpperCase()
                    .replace(/-/g, "_")}
                  color="goldenrod"
                  size="50"
                  animate="true"
                  className="icon"
                />
                <p>T</p>
              </div>
              <div>
                <ReactAnimatedWeather
                  icon={this.state.res.daily.data[5].icon
                    .toUpperCase()
                    .replace(/-/g, "_")}
                  color="goldenrod"
                  size="50"
                  animate="true"
                  className="icon"
                />
                <p>F</p>
              </div>
              <div>
                <ReactAnimatedWeather
                  icon={this.state.res.daily.data[6].icon
                    .toUpperCase()
                    .replace(/-/g, "_")}
                  color="goldenrod"
                  size="50"
                  animate="true"
                  className="icon"
                />
                <p>S</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  }
}

export default SearchRes;
