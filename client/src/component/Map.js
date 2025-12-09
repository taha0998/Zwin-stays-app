import { Map, Marker } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import { useEffect, useState } from "react";

const MapComponent = ({ hotel }) => {
  const [coords, setCoords] = useState(hotel?.coords);

useEffect(()=>{
  setCoords(hotel?.coords)
},[hotel?.coords])

  return (
    <div className="map-section-container">
      <h2 className="map-title">
        {hotel?.title}, {hotel?.city}
      </h2>
      {hotel?.coords && (
        <Map
          provider={osm}
          height={600}
          center={coords}
          defaultZoom={17}
        >
          <Marker width={50} anchor={coords} />
        </Map>
      )}
    </div>
  );
};
export default MapComponent;
