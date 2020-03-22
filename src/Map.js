import React, { useState } from 'react';
import './Map.css';
import ReactMap from 'react-map-gl';

export default function Map() {
    const accessToken = "pk.eyJ1IjoibWJ1ZWhyZXIiLCJhIjoiY2s4Mjk5cGNxMGdwMTNmcnd4NjhvcnQ2dCJ9.ut6-Z7fPqms5_KwvVoFctw";
    console.log(accessToken);
    const [viewport, setViewport] = useState({
        latitude: 50.934311,
        longitude: 11.432919,
        width: "50vw",
        height: "80vh",
        zoom: 10
    })

    return (
        <div>
            <ReactMap
                {...viewport}
                mapboxApiAccessToken={accessToken}
                onViewportChange={(viewport => {
                    setViewport(viewport);
                })}
                mapStyle="mapbox://styles/mbuehrer/ck82askla0a6y1jqkzwvjanm7">
            </ReactMap>
        </div>
    )

}