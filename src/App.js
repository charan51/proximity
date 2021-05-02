import React, { useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
const ENDPOINT = "ws://city-ws.herokuapp.com";
const client = new W3CWebSocket(ENDPOINT);
function App() {
  const [AQIresponse, setAQIResponse] = useState([]);
  client.onmessage = (message) => {
    setAQIResponse(JSON.parse(message.data));
  };
  let tableData =  AQIresponse.map((item) => {
    var time = new Date();
    const aqiRoundOff = Math.round(item.aqi);
    const city = item.city;
    const aqi = item.aqi.toFixed(2);
    let AQIstatus = "";
    if (aqiRoundOff <= 50) {
      AQIstatus = "good";
    } else if (aqiRoundOff >= 51 && aqiRoundOff <= 100) {
      AQIstatus = "satisfactory";
    } else if (aqiRoundOff >= 101 && aqiRoundOff <= 200) {
      AQIstatus = "moderate";
    }else if (aqiRoundOff >= 101 && aqiRoundOff <= 200) {
      AQIstatus = "poor";
    }else if (aqiRoundOff >= 201 && aqiRoundOff <= 300) {
      AQIstatus = "veryPoor";
    }else if (aqiRoundOff >= 301 && aqiRoundOff <= 400) {
      AQIstatus = "moderate";
    }else if (aqiRoundOff >= 401 && aqiRoundOff <= 500) {
      AQIstatus = "severe";
    }
    return (
      <tr>
        <td>{city}</td>
        <td className={AQIstatus}>{aqi}</td>
        <td>{time.toLocaleTimeString('en-US')}</td>
      </tr>
    );
  });
  return (
    <Container>
      <Row>
        <Col md={{ span: 10, offset: 2 }}>
          <Card variant="flush">
            <Card.Body>
              <Card.Title>Central Pollution Control Board's </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Air Quality Standrads
              </Card.Subtitle>
              <Card.Text>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th style={{"width": "180px"}}>City</th>
                      <th style={{"width": "280px"}}>Current Air Quality Index (AQI)</th>
                      <th style={{"width": "180px"}}>Last updated</th>
                    </tr>
                  </thead>
                  <tbody>{tableData}</tbody>
                </Table>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
