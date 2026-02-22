import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

const CountryMap = ({ countryName, geoCountry, lat, lng }) => {

  return (
    <div className="mt-25 mb-5 flex justify-center">
      <MapContainer
        center={[lat, lng]}
        zoom={5}
        style={{ height: "400px", width: "80%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <GeoJSON
          data={geoCountry}
          style={{
            color: "#ff0000",
            weight: 3,
            opacity: 1,
            fillColor: "#ff0000",
            fillOpacity: 0.1
          }}
          onEachFeature={(feature, layer) => {
            layer.bindPopup(`<b>${countryName}</b>`);
          }}
        />
      </MapContainer>
    </div>
  );
};

export default CountryMap;