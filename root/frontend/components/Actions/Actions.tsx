import { Space, Button, Radio, Tooltip } from "antd";
import {
  getDirectionToSelected,
  drawDirections,
  removeDirections,
} from "../Map/directions";
import { clearAllMarkers } from "../Map/generateNewMarker";
import { showAllMarker } from "../Map/useMap";
import { HomeOutlined, RocketOutlined } from "@ant-design/icons";

type Props = {
  map: React.MutableRefObject<mapboxgl.Map | null>;
  currentLat: number;
  currentLong: number;
  routingProfile: string;
  setRoutingProfile: (routingProfile: string) => void;
  setCoords: (lat: number, lon: number) => void;
};

export const Actions = ({
  map,
  currentLat,
  currentLong,
  routingProfile,
  setRoutingProfile,
  setCoords,
}: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "12px",
      }}
    >
      <Space wrap size={"large"}>
        <Button
          type="primary"
          onClick={() => {
            showAllMarker(map.current!);
          }}
        >
          Update drinking points
        </Button>
        <Button
          type="primary"
          onClick={async () => {
            const route = await getDirectionToSelected(
              currentLat,
              currentLong,
              routingProfile
            );
            clearAllMarkers();
            window.document.getElementById("duration").innerText =
              String(Math.floor(Number(route.duration) / 60)) +
              "min " +
              String(Math.floor(Number(route.duration)) % 60) +
              "s";
            window.document.getElementById("distance").innerText = String(
              (Number(route.distance) / 1000).toFixed(3)
            );
            window.document.getElementById("diff").innerText = String(
              route.weight
            );
            window.document.getElementById("type").innerText = String(
              route.weight_name
            );
            drawDirections(map.current!, route?.geometry);
          }}
        >
          Go to the selected
        </Button>
        <Button type="primary" onClick={() => removeDirections(map.current!)}>
          Erase directions
        </Button>
        <Tooltip title="Go to Grenoble">
          <Button
            shape="circle"
            icon={<RocketOutlined />}
            onClick={() => {
              setCoords(45.171547, 5.722387); // Grenoble coordinates
            }}
          />
        </Tooltip>
        <Tooltip title="Go back to current location">
          <Button
            shape="circle"
            icon={<HomeOutlined />}
            onClick={() => {
              navigator.geolocation.getCurrentPosition((options) =>
                setCoords(options.coords.latitude, options.coords.longitude)
              );
            }}
          />
        </Tooltip>
      </Space>
      <Radio.Group
        onChange={(e) => {
          setRoutingProfile(e.target.value);
        }}
        defaultValue="walking"
        size={"middle"}
      >
        <Radio.Button value="walking">Walk</Radio.Button>
        <Radio.Button value="driving">Driving</Radio.Button>
        <Radio.Button value="driving-traffic">Traffic</Radio.Button>
        <Radio.Button value="cycling">Cycling</Radio.Button>
      </Radio.Group>
    </div>
  );
};
