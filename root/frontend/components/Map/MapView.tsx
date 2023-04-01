import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import React, { useRef, useState } from "react";
import { useMap } from "./useMap";
import { Actions } from "../Actions";
import { NavInfo } from "../NavInfo";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY ?? "";

export const MapView = (): JSX.Element => {
  const [routingProfile, setRoutingProfile] = useState("walking");
  const mapRef = useRef<HTMLDivElement>(null);
  const {
    mapInitRef: map,
    currentLat,
    currentLong,
    setCoords,
  } = useMap(mapRef);

  return (
    <>
      <Actions
        map={map}
        currentLat={currentLat}
        currentLong={currentLong}
        routingProfile={routingProfile}
        setRoutingProfile={setRoutingProfile}
        setCoords={setCoords}
      />
      <NavInfo />
      <div
        className="mapContainer"
        style={{
          height: "80%",
          width: "70%",
          alignContent: "center",
          position: "absolute",
        }}
      >
        <div
          ref={mapRef}
          className="map"
          style={{ height: "70vh", width: "80vw" }}
        />
      </div>
    </>
  );
};
