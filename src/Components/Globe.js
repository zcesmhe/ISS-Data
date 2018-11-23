import React from "react";

class Globe extends React.Component {

    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        this.earth.setView([nextProps.lat, nextProps.lng]);
        this.marker.setLatLng([nextProps.lat, nextProps.lng]);
    }

    componentDidMount() {
        this.earth = new window.WE.map(this.refs.earth, {
            maxAltitude: 35000000,
            zooming: false,
            tilting: false,
            scrollWheelZoom: false,
            dragging: false
        });
        this.earth.setView([0, 0], 2);
        this.marker = window.WE.marker([0, 0]).addTo(this.earth);
        window.WE.tileLayer('https://webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg', {
            tileSize: 256,
            bounds: [[-85, -180], [85, 180]],
            minZoom: 0,
            maxZoom: 16,
            tms: true
        }).addTo(this.earth);
    }

    render() {
        return (
            <div id="earth" ref="earth"></div>
        );
    }
}

export default Globe;


