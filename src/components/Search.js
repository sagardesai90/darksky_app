import React, { Component } from "react";
import api from "../api/api";
import SearchRes from "./SearchRes";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      city: "",
      latLon: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }
  // componentDidMount() {}

  handleChange(event) {
    console.log(this.state);
    this.setState({ city: event.target.value });
  }

  // handleSubmit(event) {
  //   alert("A name was submitted: " + this.state.value);
  //   event.preventDefault();
  // }

  submitSearch = event => {
    event.preventDefault();
    // this.setState({ city: [] });
    let city = this.state.city.trim();
    api.geocode(city).then(res => {
      const { lat, lng } = res.results[0].locations[0].latLng;
      this.setState({
        city,
        latLon: [lat, lng]
      });
      console.log(this.state, "state");
    });
  };

  render() {
    return (
      <div className="search-bar">
        <form id="form" onSubmit={this.submitSearch.bind(this)}>
          <div className="field">
            <p>Which city?</p>
            <input
              className="search-input"
              id="input-field"
              placeholder="Get the weather."
              onChange={this.handleChange}
              value={this.state.city}
            />
            <input type="submit" value="Submit" />
          </div>
        </form>
        <SearchRes latLon={this.state.latLon} />
      </div>
    );
  }
}

export default Search;
