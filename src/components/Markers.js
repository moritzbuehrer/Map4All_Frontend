import React from 'react';
import { Marker } from 'react-map-gl';
import infoIcon from '../icons/infoIcon.svg';
import testIcon from '../icons/testIcon.svg'
import './Markers.css';

class Markers extends React.Component {

    render() {
        return (
            this.props.markers.map(marker => {
                switch (marker.type) {
                    case 'testcenter':
                        return (
                            <Marker key={marker.id} longitude={marker.longitude} latitude={marker.latitude} >
                                <img src={testIcon} alt='Testcenter' />
                            </Marker>)
                    case 'infocenter':
                        return (
                            <Marker className="markerIcon" key={marker.id} longitude={marker.longitude} latitude={marker.latitude} >
                                <img src={infoIcon} alt="Infocenter" />
                            </Marker>)
                    default:
                        console.log("Faulty marker type found!")
                        return null;
                }
            })
        );



    }
}

export default Markers
