import React from 'react';
import './Infobox.css';
import { Row, Col, Divider, List, message, Avatar, Spin } from 'antd';
import { CloseSquareFilled } from '@ant-design/icons';
import infoIcon from '../icons/infoIcon.svg';
import testIcon from '../icons/testIcon.svg';

// TODO
// - Panels with Box instead of Box only
// - Info header for state
// - Icons include
// - Tabs for Testing Stations etc.
class Infobox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <div className="font-large">{this.props.currentLocation.stateName ? this.props.currentLocation.stateName : "Deutschland"}</div>
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
                        dataSource={this.props.regulationData}
                        renderItem={(item) => {
                            return (
                                <List dataSource={item}
                                    renderItem={(regulationItem, index) => {
                                        if (index === 1) {
                                            return (
                                                <List
                                                    dataSource={regulationItem}
                                                    renderItem={(itemData) => {
                                                        return (
                                                            < List.Item >
                                                                <List.Item.Meta
                                                                    title={itemData.info}
                                                                />
                                                                <div>Ab dem: {itemData.specDate}</div>
                                                            </List.Item>)
                                                    }}>
                                                </List>)
                                        } else {
                                            return (
                                                <div>
                                                    <Divider />
                                                    <span>{<CloseSquareFilled className="font-large" style={{ color: "#8B0000" }} />}</span>
                                                    <span className="font-medium font-bold padding-left">{regulationItem}</span>
                                                    <Divider />
                                                </div>
                                            )
                                        }
                                    }}
                                >
                                </List>
                            )
                        }}
                    >
                    </List>
                </div>
            </div >
        )
    };
}

export default Infobox;