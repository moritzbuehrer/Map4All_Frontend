import React from 'react';
import './Overview.css';
import MapSearch from '../components/Map';
import Infobox from '../components/Infobox';
import { Row, Col } from 'antd';

class Overview extends React.Component {
    state = {
        currentLocation: {
            stateId: "",
            stateName: "",
            postcode: "",
        },
        regulationData: []
    }

    setLocation = (stateId, stateName, postcode) => {
        this.setState({
            currentLocation: {
                stateId: stateId,
                stateName: stateName,
                postcode: postcode
            }
        });
    }

    setRegulationData = (regulationData) => {
        this.setState({
            regulationData: regulationData
        });
    }

    render() {
        return (
            <Row gutter={[32, 8]} type="flex">
                <Col xs={24} xl={12}>
                    <MapSearch setLocation={this.setLocation} setRegulationData={this.setRegulationData} />
                </Col>
                <Col xs={16} xl={12}>
                    <Infobox currentLocation={this.state.currentLocation} regulationData={this.state.regulationData} />
                </Col>
            </Row >
        )
    };
}

export default Overview;


