import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import React, {useRef, useState} from "react";
import {showAllMarker, useMap} from "./useMap";
import {Button, Col, Radio, Row, Space, Statistic} from "antd";
import {drawDirections, getDirectionToSelected, removeDirections} from "@/components/Map/directions";
import {clearAllMarkers} from "@/components/Map/generateNewMarker";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY ?? "";

export const MapView = (): JSX.Element => {
    const [routingProfile, setRoutingProfile] = useState("walking")
    const mapRef = useRef<HTMLDivElement>(null);
    const {mapInitRef: map, currentLat, currentLong} = useMap(mapRef);

    return (
        <div>
            <Space wrap size={"large"}>
                <Button type="primary" onClick={() => {
                    showAllMarker(map.current!)
                }}>Update drinking points</Button>
                <Button type="primary" onClick={async () => {
                    const route = await getDirectionToSelected(currentLat, currentLong, routingProfile);
                    clearAllMarkers();
                    window.document.getElementById("duration").innerText = String(Math.floor(Number(route.duration) / 60)) + "min " + String(Math.floor(Number(route.duration)) % 60) + "s"
                    window.document.getElementById("distance").innerText = String((Number(route.distance) / 1000).toFixed(3))
                    window.document.getElementById("diff").innerText = String(route.weight)
                    window.document.getElementById("type").innerText = String(route.weight_name)
                    drawDirections(map.current!, route?.geometry);
                }
                }>Go to the selected</Button>
                <Button type="primary" onClick={() => removeDirections(map.current!)}>Erase directions</Button>
            </Space>
            <div style={{margin: "10px", color: "black"}}>
                <Row gutter={20}>
                    <Col span={5}>
                    <Radio.Group onChange={(e) => {
                        setRoutingProfile(e.target.value)
                    }} defaultValue="walking" size={"middle"}>
                        <Radio.Button value="walking">Walk</Radio.Button>
                        <Radio.Button value="driving">Driving</Radio.Button>
                        <Radio.Button value="driving-traffic">Traffic</Radio.Button>
                        <Radio.Button value="cycling">Cycling</Radio.Button>
                    </Radio.Group>
                    </Col>
                    <Col span={4}>
                        <h2>Duration</h2>
                        <p style={{fontSize: "15px"}} id={"duration"}></p>
                    </Col>
                    <Col span={4}>
                        <h2>Distance</h2>
                        <p style={{fontSize: "15px"}} id={"distance"}></p>
                    </Col>
                    <Col span={4}>
                        <h2>Type of road</h2>
                        <p style={{fontSize: "15px"}} id={"type"}></p>
                    </Col>
                    <Col span={4}>
                        <h2>Difficulty</h2>
                        <p style={{fontSize: "15px"}} id={"diff"}></p>
                    </Col>
                </Row>
            </div>
            <div
                className="mapContainer"
                style={{height: "80%", width: "70%", alignContent: "center", position: "absolute"}}
            >
                <div
                    ref={mapRef}
                    className="map"
                    style={{height: "100%", width: "100%"}}
                />
            </div>
        </div>
    );
};
