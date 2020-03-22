import React, { useState } from 'react';
import './Overview.css';
import Map from './Map';
import Infobox from './Infobox';
import { Container, Row, Col } from 'reactstrap';

const Overview = (props) => {
    return (
        <Container>
            <Row>
                <Col><Map /></Col>
                <Col><Infobox /></Col>
            </Row>
        </Container>
    )
}

export default Overview;


