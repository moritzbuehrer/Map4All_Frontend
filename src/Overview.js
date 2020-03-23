import React from 'react';
import './Overview.css';
import Map from './Map';

class Overview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <div>
                <Map className="InsideContent" />
            </div>
        )
    }

}

export default Overview;
