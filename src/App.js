import React, { Component } from 'react';
import Astronauts from "./Components/Astronauts";
import ISSMap from "./Components/ISSMap";
import Globe from "./Components/Globe";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
      unixTS: "",
      naturalTS: "",
      velocityKM: "",
      velocityMiles: ""
    };

    this.getTime = this.getTime.bind(this);
    this.getVelocityKmh = this.getVelocityKmh.bind(this);

  }

  componentDidMount() {
    this.interval = setInterval(() =>
      fetch("http://api.open-notify.org/iss-now.json")
        .then(res => res.json())
        .then(json => {
          var previousLat = this.state.latitude;
          var previousLong = this.state.longitude;
          var currentLat = json.iss_position.latitude;
          var currentLong = json.iss_position.longitude
          this.setState({
            latitude: currentLat,
            longitude: currentLong,
            unixTS: json.timestamp,
            naturalTS: this.getTime(),
            velocityKM: this.getVelocityKmh(currentLat, previousLat, currentLong, previousLong),
            velocityMiles: this.getVelocityKmh(currentLat, previousLat, currentLong, previousLong) / 1.609344
          });
        }), 1000);
  }

  getTime() {
    var date = new Date();
    return date.toLocaleTimeString();
  }

  getVelocityKmh(lat1, lat2, long1, long2) {
    var earthRadius = 6371;
    var dLat = (lat2 - lat1) * 2 * Math.PI * earthRadius / 360;
    var dLong = (long2 - long1) * 2 * Math.PI * earthRadius / 360
    var distanceKM = Math.sqrt(Math.pow(dLat, 2) + Math.pow(dLong, 2));
    return distanceKM * 3600;
  }

  render() {
    return (
      <div className="App">
        <h1>Current information from the International Space Station</h1>
        <Astronauts />
        <table>
          <tr>
            <th>Current Latitude:</th>
            <td>{this.state.latitude}</td>
          </tr>
          <tr>
            <th>Current Longitude:</th>
            <td>{this.state.longitude}</td>
          </tr>
          <tr>
            <th>Current Timestamp (Unix):</th>
            <td>{this.state.unixTS}</td>
          </tr>
          <tr>
            <th>Current Timestamp (Natural):</th>
            <td>{this.state.naturalTS}</td>
          </tr>
          <tr>
            <th>Current Velocity (km/h):</th>
            <td>{this.state.velocityKM}</td>
          </tr>
          <tr>
            <th>Current Velocity (mph):</th>
            <td>{this.state.velocityMiles}</td>
          </tr>
        </table>
        <ISSMap lat={parseFloat(this.state.latitude)} lng={parseFloat(this.state.longitude)} />
        <Globe lat={parseFloat(this.state.latitude)} lng={parseFloat(this.state.longitude)} />
        <h2>Data provided by <a href="http://open-notify.org/Open-Notify-API/ISS-Location-Now/" target="blank">Open-Notify</a> and is updated every second.</h2>
      </div>
    );
  }
}

export default App;
