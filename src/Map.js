import React, { useState } from 'react';
import { Input } from 'antd';
import './Map.css';
import ReactMap from 'react-map-gl';

const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const accessToken = 'pk.eyJ1IjoibWJ1ZWhyZXIiLCJhIjoiY2s4Mjk5cGNxMGdwMTNmcnd4NjhvcnQ2dCJ9.ut6-Z7fPqms5_KwvVoFctw';

const { Search } = Input;

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 50.934311,
                longitude: 11.432919,
                width: "50vw",
                height: "100vh",
                zoom: 6
            },
            currentState: "",
            postCode: ""
        }
        this.stateClick = this.stateClick.bind(this);
    }

    stateClick(e) {
        if (e.type == "click" && e.lngLat) {
            //console.log("Longitude:", e.lngLat[0]);
            //console.log("Latitude:", e.lngLat[1]);

            fetch(baseUrl + e.lngLat[0] + "," + e.lngLat[1] + ".json?access_token=" + accessToken)
                .then(res => res.json())
                .then(
                    (result) => {

                        // Analyze rusult object and get state name
                        var featureArray = result.features
                        var region = featureArray.find(x => x.place_type[0] === "region");
                        var regionName = region.text;
                        console.log(region);
                        this.setState({
                            viewport: {
                                ...this.state.viewport,
                                latitude: region.center[1],
                                longitude: region.center[0]
                            },
                            currentState: regionName
                        })

                        //alert(regionName);

                    },
                    (error) => {
                        alert("Error while API call")
                        console.log(error)
                        /*
                        this.setState({
                          isLoaded: true,
                          error
                        });
                        */
                    }
                )

        }
    }

    onSearch(postCode){
        fetch(baseUrl + postCode + ".json?access_token=" + accessToken)
        .then(res => res.json())
        .then(
            (result) => {

                console.log(result);
                

            },
            (error) => {
                alert("Error while API call")
                console.log(error)
                /*
                this.setState({
                  isLoaded: true,
                  error
                });
                */
            }
        )
    }

    render() {
        const { viewport } = this.state;
        return (
            <div>
                <Search
                    placeholder="Postleitzahl"
                    onSearch={postCode => this.onSearch(postCode)}
                    style={{ width: 200 }}
                />
                <div>
                    {this.state.currentState}
                </div>
                <ReactMap
                    {...viewport}
                    mapboxApiAccessToken={accessToken}
                    onViewportChange={viewport => this.setState({ viewport })}
                    onClick={this.stateClick}
                    mapStyle="mapbox://styles/mbuehrer/ck83jkn5x12gg1iqmis0qhvmm">
                </ReactMap>
            </div>
        )
    }
}

export default Map;