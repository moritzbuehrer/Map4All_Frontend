import React, { useState } from 'react';
import { Input } from 'antd';
import './Map.css';
import ReactMap from 'react-map-gl';
import { authHeader } from './helper/auth-header.js'
import { Row, Col, Divider, List, message, Avatar, Spin } from 'antd';
import { CloseSquareFilled } from '@ant-design/icons';
import reqwest from 'reqwest';
import InfiniteScroll from 'react-infinite-scroller';

const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const accessToken = 'pk.eyJ1IjoibWJ1ZWhyZXIiLCJhIjoiY2s4Mjk5cGNxMGdwMTNmcnd4NjhvcnQ2dCJ9.ut6-Z7fPqms5_KwvVoFctw';
const map4AllApi = 'https://map4all.appspot.com/'

const { Search } = Input;

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 50.934311,
                longitude: 11.432919,
                width: "100%",
                height: "100vh",
                zoom: 6
            },
            currentState: "",
            postCode: ""
        }
        this.stateClick = this.stateClick.bind(this);
    }

    updateChild(state) {
        updateState(state)
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

                        this.updateChild(regionName);
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

    onSearch(postCode) {
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
            <Row gutter={[32, 8]}>
                <Col span={12}>

                    <ReactMap
                        {...viewport}
                        mapboxApiAccessToken={accessToken}
                        onViewportChange={viewport => this.setState({ viewport })}
                        onClick={this.stateClick}
                        mapStyle="mapbox://styles/mbuehrer/ck83jkn5x12gg1iqmis0qhvmm" >
                        <Search
                            placeholder="Postleitzahl"
                            onSearch={postCode => this.onSearch(postCode)}
                            style={{ width: 200, margin: 10 }
                            }
                        />
                    </ReactMap>
                </Col>
                <Col span={12}>
                    <Infobox />
                </Col>
            </Row>
        )
    }
}

function updateState(state) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    fetch(map4AllApi + 'enactment/state/2', requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                this.setState({ id: result.id, date: result.date, startDate: result.startDate, endDate: result.endDate, url: result.url })
            },
            (error) => {
                alert("Error while API call")
                console.log(error)
            }
        )
}

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

class Infobox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            date: "",
            startDate: "",
            endDate: "",
            url: "",
            stateId: "",
            districtId: "",
            data: [],
            loading: false,
            hasMore: true,
        }
        updateState = updateState.bind(this)
    }

    componentDidMount() {
        this.fetchData(res => {
            this.setState({
                data: res.results,
            });
        });
    }

    fetchData = callback => {
        reqwest({
            url: fakeDataUrl,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: res => {
                callback(res);
            },
        });
    };

    handleInfiniteOnLoad = () => {
        let { data } = this.state;
        this.setState({
            loading: true,
        });
        if (data.length > 14) {
            message.warning('Infinite List loaded all');
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
        this.fetchData(res => {
            data = data.concat(res.results);
            this.setState({
                data,
                loading: false,
            });
        });
    };

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <div class="font-large">Übersicht Karte</div>
                    </Col>
                </Row>
                <Row>
                    <div class="font-medium font-bold">
                        <Col>
                            <CloseSquareFilled style={{ color: "#F4C5B5" }} /> Ausgangsbeschränkungen
                        </Col>
                        <Col>
                            <CloseSquareFilled style={{ color: "#F4C5B5" }} /> Corona Testzentrum
                            <CloseSquareFilled style={{ color: "#F4C5B5" }} /> Ausgangsbeschränkungen
                        </Col>
                    </div>
                </Row>
                <Divider />
                <div className="infinite-container">
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.handleInfiniteOnLoad}
                        hasMore={!this.state.loading && this.state.hasMore}
                        useWindow={false}
                    >
                        <List
                            dataSource={this.state.data}
                            renderItem={item => (
                                <List.Item key={item.id}>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar icon={< CloseSquareFilled style={{ color: "#F4C5B5" }} />} />
                                        }
                                        title={item.name.last}
                                        description={item.email}
                                    />
                                    <div>Content</div>
                                </List.Item>
                            )}
                        >
                            {this.state.loading && this.state.hasMore && (
                                <div className="loading-container">
                                    <Spin />
                                </div>
                            )}
                        </List>
                    </InfiniteScroll>
                </div>
            </div >
        )
    };
}

export default Map;