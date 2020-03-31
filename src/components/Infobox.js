import React from 'react';
import './Map.css';
import { authHeader } from '../helper/auth-header.js'
import { Row, Col, Divider, List, message, Avatar, Spin } from 'antd';
import { CloseSquareFilled } from '@ant-design/icons';
import reqwest from 'reqwest';
import InfiniteScroll from 'react-infinite-scroller';
import infoIcon from '../icons/infoIcon.svg';
import testIcon from '../icons/testIcon.svg';

const map4AllApi = 'https://map4all.appspot.com'

function updateState(state) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    fetch(map4AllApi + '/enactment/state/2', requestOptions)
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
                data: res,
            });
        });
    }

    fetchData = callback => {
        reqwest({
            url: map4AllApi + '/enactment/state/regulations/1',
            type: 'json',
            method: 'get',
            headers: authHeader(),
            contentType: 'application/json',
            success: res => {
                console.log(Object.values(res))
                callback(Object.values(res));
            },
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
                            <img src={infoIcon} alt='Informationcenter' /> Corona Informationszentrum
                        </Col>
                        <Col>
                            <img src={testIcon} alt='Testcenter' /> Corona Testzentrum
                        </Col>
                        <Col>
                            <CloseSquareFilled style={{ color: "#F4C5B5" }} /> Ausgangsbeschränkungen
                        </Col>
                    </div>
                </Row>
                <Divider />
                <div className="infinite-container">
                    <List
                        dataSource={this.state.data}
                        renderItem={item => (
                            < List
                                dataSource={item}
                                renderItem={itemData => (
                                    < List.Item >
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar icon={< CloseSquareFilled style={{ color: "#F4C5B5" }} />} />
                                            }
                                            title={"Maßnahmenklasse: " + itemData.regulationClassId}
                                            description={itemData.info}
                                        />
                                        <div>Ab dem: {itemData.specDate}</div>
                                    </List.Item>
                                )}
                            >
                            </List>
                        )}
                    >
                    </List>
                </div >
            </div >
        )
    };
}

export default Infobox;
