import React from 'react';
import './Map.css';
import { authHeader } from '../helper/auth-header.js'
import { Row, Col, Divider, List, message, Avatar, Spin } from 'antd';
import { CloseSquareFilled } from '@ant-design/icons';
import reqwest from 'reqwest';
import InfiniteScroll from 'react-infinite-scroller';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
const map4AllApi = 'https://map4all.appspot.com/'

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
                        <div className="font-large">{this.props.currentLocation.state ? this.props.currentLocation.state : "Deutschland"}</div>
                    </Col>
                </Row>
                <Row>
                    <div className="font-medium font-bold">
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

export default Infobox;