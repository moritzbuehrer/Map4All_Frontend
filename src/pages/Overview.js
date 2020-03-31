import React from 'react';
import { Row, Col } from 'antd';
import './Overview.css';
import MapSearch from '../components/Map';
import Infobox from '../components/Infobox';


class Overview extends React.Component {

    state = {
        currentLocation: {
            stateId: "",
            stateName: "",
            postcode: "",

        }
    }

    setLocation = (stateId, stateName, postcode ) => {
        this.setState({
            currentLocation: {
                stateId: stateId,
                stateName: stateName,
                postcode: postcode
            }
        });
    }

    render() {
        return (
            <Row gutter={[32, 8]}>
                <Col span={12}>
                    <MapSearch setLocation={this.setLocation} />
                </Col>
                <Col span={12}>
                    <Infobox currentLocation={this.state.currentLocation} />
                </Col>
            </Row>
        )
    };
}

export default Overview;


