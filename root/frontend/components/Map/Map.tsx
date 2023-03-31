import 'mapbox-gl/dist/mapbox-gl.css';
import { MapboxOptions } from 'mapbox-gl';
import { useEffect, useState } from 'react';
import ReactMapboxGl, {
  Feature,
  Layer,
  NavigationControl,
} from 'react-mapbox-gl';

const MapDiv = ReactMapboxGl({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_KEY ?? '',
});

const mapStyle: MapboxOptions['style'] = 'mapbox://styles/mapbox/streets-v11';

export const Map = (): JSX.Element => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => {
        console.error(error);
      },
    );
  }, []);

  return (
    <div className="mapContainer">
      <MapDiv
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        style={mapStyle}
        containerStyle={{ height: '70vh', width: '80vw' }}
        center={[longitude ?? 0, latitude ?? 0]}
        zoom={[10]}
      >
        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
          <Feature coordinates={[longitude ?? 0, latitude ?? 0]} />
        </Layer>
        <NavigationControl />
      </MapDiv>
    </div>
  );
};
