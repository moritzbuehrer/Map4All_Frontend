import React, { useState } from 'react';
import './Infobox.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const Infobox = (props) => {
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle>Brandeburg</CardTitle>
                    <CardSubtitle>Bundesland</CardSubtitle>
                    <CardText>Schulen und Kitas</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

export default Infobox;;