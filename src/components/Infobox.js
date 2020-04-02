import React from 'react';
import './Infobox.css';
import { Row, Col, Divider, List, Collapse } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import catRed from '../icons/cat-red.svg';
import legRed from '../icons/leg-red.svg';
import legGreen from '../icons/leg-green.svg';
import detsRed from '../icons/dets-red.svg';
import detsGreen from '../icons/dets-green.svg';

const { Panel } = Collapse;

const genHeader = (header) => (
    <span><img src={catRed} alt='Gesperrt' /><span className="font-medium font-bold padding-left">{header}</span></span>
);

const genCollapse = (regulationData) => {
    let catIndex = 0;
    let panels = [];

    regulationData.forEach((item, index) => {
        catIndex = index;
        panels.push(<Panel header={genHeader(item[0])} key={catIndex}>
            <List className="regulation-list"
                dataSource={item[1]}
                renderItem={(itemData) => {
                    return (
                        < List.Item className="regulation-element">
                            <List.Item.Meta
                                title={itemData.info}
                            />
                        </List.Item>
                    )
                }}>
            </List>
        </Panel>);
    });
    console.log(panels);
    return panels;
}

class Infobox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <div className="font-medium">Übersicht Karte</div>
                    </Col>
                </Row>
                <Row>
                    <div className="font-medium font-bold">
                        <Col>
                            <img src={detsRed} alt='Informationcenter' /> Ausgangsbeschränkungen
                        </Col>
                    </div>
                </Row>
                <Divider />
                <Row>
                    <Col>
                        <img src={legGreen} alt='Geöffnet' /> Geöffnet &ensp;
                        <img src={legRed} alt='Geschlossen' /> Geschlossen
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="font-medium font-bold">Maßnahmen</div>
                        <div className="font-large font-bold">{this.props.currentLocation.stateName ? this.props.currentLocation.stateName : "Deutschland"}</div>
                    </Col>
                </Row>
                <div>
                    <Collapse accordion
                        expandIconPosition="right"
                        bordered={false}
                        expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}>
                        {genCollapse(this.props.regulationData)}
                    </Collapse>

                </div >
            </div >
        )
    };
}

export default Infobox;