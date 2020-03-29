import React from 'react';
import { Input } from 'antd';
import './Map.css';
import ReactMap, { WebMercatorViewport, Layer, Source } from 'react-map-gl';
import geojsonData from './map/states_de.geojson';
import {statesLayer, highlightLayer} from './map/mapLayers';

const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const accessToken = 'pk.eyJ1IjoibWJ1ZWhyZXIiLCJhIjoiY2s4Mjk5cGNxMGdwMTNmcnd4NjhvcnQ2dCJ9.ut6-Z7fPqms5_KwvVoFctw';

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
                zoom: 5.5
            },
            stateFilter: ['in', 'NAME_1', ''],
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
                zoom: newViewport.zoom
            }
        })
    }

    stateClick = (e) => {
        if (e.type === "click" && e.lngLat) {

            fetch(baseUrl + e.lngLat[0] + "," + e.lngLat[1] + ".json?access_token=" + accessToken)
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

                            // Set parent state information about postcode and state
                            this.props.setLocation("", regionName);

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
        fetch(baseUrl + postCode + ".json?access_token=" + accessToken)
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
            }
        }
    }

    render() {
        const { viewport } = this.state;

        return (
            <ReactMap
                {...viewport}
                mapboxApiAccessToken={accessToken}
                onViewportChange={viewport => this.setState({ viewport })}
                onClick={(e) => this.stateClick(e)}
                onHover={(e) => this.handleMouseHover(e)}
                mapStyle="mapbox://styles/mbuehrer/ck83jkn5x12gg1iqmis0qhvmm" >

                <Source id="state_data_fill" type="geojson" data={geojsonData}>
                    <Layer beforeId="waterway-label" {...statesLayer} />
                    <Layer beforeId="waterway-label" {...highlightLayer} filter={this.state.stateFilter} />
                </Source>

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