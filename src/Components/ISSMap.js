import React from "react";

class ISSMap extends React.Component {

    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        console.log(typeof nextProps.lat);
        this.map.panTo({lat : nextProps.lat, lng : nextProps.lng});
        this.marker.setPosition({lat : nextProps.lat, lng : nextProps.lng});
    }

    componentDidMount(props) {
        this.map = new window.google.maps.Map(this.refs.map, {
            center: { lat: 0, lng: 0 },
            zoom: 2
        });
        this.marker = new window.google.maps.Marker({
            position: { lat: 0, lng: 0 },
            map: this.map,
            title: 'Current ISS Position'
          });
    }

    render() {
        return(
            <div id="map" ref="map"></div>
        );
    }
}

export default ISSMap;