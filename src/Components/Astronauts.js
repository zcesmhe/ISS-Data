import React from "react";

class Astronauts extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            astronauts : []
        }
    }

    componentDidMount() {
        fetch("http://api.open-notify.org/astros.json")
            .then(res => res.json())
            .then(json => {
                this.setState({
                    astronauts: json.people
                });
            });
    }

    render() {
        var astronautNames = this.state.astronauts.map(astronaut => <li>{astronaut.name}</li>);
        return(
            <div>
                <p>Currently there are {this.state.astronauts.length} people on board the ISS. They are:</p>
                <ul>
                    {astronautNames}
                </ul>
            </div>
        );
    }
}

export default Astronauts;