import React, { useState } from 'react';
import './Overview.css';
//import mapboxgl from 'mapbox-gl'
import Map from './Map';

const accessToken = 'pk.eyJ1IjoibWJ1ZWhyZXIiLCJhIjoiY2s4Mjk5cGNxMGdwMTNmcnd4NjhvcnQ2dCJ9.ut6-Z7fPqms5_KwvVoFctw';

export default function Overview() {

    const [viewport, setViewport] = useState({
        latitude: 50.934311,
        longitude: 11.432919,
        width: "100vw",
        height: "100vh",
        zoom: 10

    })

    return (
        <div>
            <Map/>
        </div>
    )

}


