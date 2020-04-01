import React from 'react';
import { Input } from 'antd';
import './Map.css';
import { authHeader } from '../helper/auth-header.js'
import ReactMap, { WebMercatorViewport, Layer, Source, FlyToInterpolator } from 'react-map-gl';
import Markers from './Markers';
import geojsonData from './map/states_de.geojson';
import { statesLayer, highlightLayer } from './map/mapLayers';
import reqwest from 'reqwest';

const BASE_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const ACCESS_TOKEN = 'pk.eyJ1IjoibWJ1ZWhyZXIiLCJhIjoiY2s4Mjk5cGNxMGdwMTNmcnd4NjhvcnQ2dCJ9.ut6-Z7fPqms5_KwvVoFctw';
const MAP_STYLE = 'mapbox://styles/mbuehrer/ck83jkn5x12gg1iqmis0qhvmm';
const BACKEND_API = 'https://map4all.appspot.com'

const markers = [{
    id: 0,
    type: 'infocenter',
    latitude: 51.33391378558211,
    longitude: 10.446947602070097,
},
{
    id: 1,
    type: 'testcenter',
    latitude: 51.4,
    longitude: 10.446947602070097,
}]

const { Search } = Input;

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 51.33391378558211,
                longitude: 10.446947602070097,
                width: "100%",
                height: "100vh",
                zoom: 5.5,
                transitionDuration: null,
                transitionInterpolator: null

            },
            stateFilter: ['in', 'NAME_1', ''],
            stateId: ""
        }
    }

    centerMapToState = (boundingBox, centerLatitude, centerLongitude) => {
        const newViewport = new WebMercatorViewport({ width: this.state.viewport.width, height: this.state.viewport.height })
            .fitBounds([[boundingBox[0], boundingBox[1]], [boundingBox[2], boundingBox[3]]]);

        this.setState({
            viewport: {
                ...this.state.viewport,
                latitude: centerLatitude,
                longitude: centerLongitude,
                zoom: newViewport.zoom,
                transitionDuration: 1000,
                transitionInterpolator: new FlyToInterpolator()
            }
        })
    }

    fetchData = (callback) => {
        reqwest({
            url: BACKEND_API + '/enactment/state/regulations/' + this.state.stateId,
            type: 'json',
            method: 'get',
            headers: authHeader(),
            contentType: 'application/json',
            success: res => {
                callback(Object.entries(res));
            },
        });
    };

    stateClick = (e) => {
        if (e.type === "click" && e.lngLat) {

            fetch(BASE_URL + e.lngLat[0] + "," + e.lngLat[1] + ".json?access_token=" + ACCESS_TOKEN)
                .then(res => res.json())
                .then(
                    (result) => {
                        // Analyze result object and get state name
                        var featureArray = result.features;
                        var checkGermany = featureArray.find(feature => feature.text === "Germany");

                        if (checkGermany) {
                            var region = featureArray.find(feature => feature.place_type[0] === "region");
                            var regionName = region.text;

                            // Set map to state center
                            this.centerMapToState(region.bbox, region.center[1], region.center[0]);

                            // Get clicked state id
                            var clickedLayerFeature = e.features.find(feature => feature.source === "state_data_fill");
                            var stateId = clickedLayerFeature.properties.ID_1;

                            // Get clicked state id
                            var clickedLayerFeature = e.features.find(feature => feature.source === "state_data_fill");
                            var stateId = clickedLayerFeature.properties.ID_1;

                            // Set parent state information about postcode and state
                            this.props.setLocation(stateId, regionName, "postcode");

                            // set stateId as state
                            this.state.stateId = stateId;

                            // Fetch regulation information
                            this.fetchData(res => {
                                this.props.setRegulationData(res);
                            });
                        }
                    },
                    (error) => {
                        alert("Error while API call")
                        console.log(error)
                    }
                )

        }
    }

    // TODO!!! 
    onPostcodeSearch = (postCode) => {
        fetch(BASE_URL + postCode + ".json?access_token=" + ACCESS_TOKEN)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                },
                (error) => {
                    alert("Error while API call")
                    console.log(error)
                }
            )
    }

    handleMouseHover = (e) => {
        if (e.type === "pointermove" && e.features) {
            var features = e.features
            var stateLayer = features.find(feature => feature.layer.id === 'states')
            if (stateLayer) {
                this.setState({ stateFilter: ['in', 'NAME_1', stateLayer.properties.NAME_1] });
            } else {
                this.setState({ stateFilter: ['in', 'NAME_1', ''] });
            }
        }
    }

    render() {
        const { viewport, stateFilter } = this.state;

        return (
            <ReactMap
                {...viewport}
                mapboxApiAccessToken={ACCESS_TOKEN}
                onViewportChange={viewport => this.setState({ viewport })}
                onClick={(e) => this.stateClick(e)}
                onHover={(e) => this.handleMouseHover(e)}
                mapStyle={MAP_STYLE} >

                <Source id="state_data_fill" type="geojson" data={geojsonData}>
                    <Layer {...statesLayer} />
                    <Layer {...highlightLayer} filter={stateFilter} />
                </Source>

                {viewport.zoom < 5.8 ? '' : <Markers markers={markers} />}

                <Search
                    placeholder="Postleitzahl"
                    onSearch={postCode => this.onPostcodeSearch(postCode)}
                    style={{ width: 200, margin: 10 }
                    }
                />
            </ReactMap>
        )
    }
}

export default Map;