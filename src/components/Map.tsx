import React from "react";
import {
  GoogleMap,
  Marker,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export interface MapPageProps {}

interface IMapProps {
  addressOrigin: google.maps.LatLngLiteral | undefined;
  addressDestiny: google.maps.LatLngLiteral | undefined;
}

const Map :React.FC<IMapProps> = ({ addressOrigin, addressDestiny }) => {
  const [map, setMap] = React.useState<google.maps.Map>();
  const [origin, setOrigin] = React.useState<google.maps.LatLngLiteral | null>(
    null
  );
  const [destination, setDestination] =
    React.useState<google.maps.LatLngLiteral | null>(null);

  const [response, setResponse] =
    React.useState<google.maps.DistanceMatrixResponse | null>(null);
  const [pointA, setPointA] = React.useState<google.maps.LatLngLiteral>();
  const [pointB, setPointB] = React.useState<google.maps.LatLngLiteral>();

  const [distance, setDistance] = React.useState<string>("");
  const [duration, setDuration] = React.useState<string>("");

  const position = {
    lat: -27.590824,
    lng: -48.551262,
  };

  const onMapLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const traceRoute = async () => {

    setOrigin(null);
    setDestination(null);
    setResponse(null);
    setPointA(addressOrigin);
    map?.panTo({
      lat: addressOrigin?.lat || 0,
      lng: addressOrigin?.lng || 0,
    });
    setPointB(addressDestiny);
    map?.panTo({
      lat: addressDestiny?.lat || 0,
      lng: addressDestiny?.lng || 0,
    });

    if (addressOrigin && addressDestiny) {
      setOrigin(addressOrigin);
      setDestination(addressDestiny);
    } else if(!addressOrigin){
      setOrigin(null);
      setDestination(null);
    }   
  };

  const directionsServiceOptions =
    // @ts-ignore
    React.useMemo<google.maps.DirectionsRequest>(() => {
      return {
        origin,
        destination,
        travelMode: "DRIVING",
      };
    }, [origin, destination]);

  // @ts-ignore
  const directionsCallback = React.useCallback((res) => {
    if (res !== null && res.status === "OK") {
      console.log("\n\n\n\n\n"+JSON.stringify(res));
      setDistance(res.routes[0].legs[0].distance.text);
      setDuration(res.routes[0].legs[0].duration.text);
      setResponse(res);
    } else {
      console.log(res);
    }
  }, []);

  const directionsRendererOptions = React.useMemo<any>(() => {
    return {
      directions: response,
    };
  }, [response]);

  return (
    <div className="map">
      <LoadScript
        googleMapsApiKey={'AIzaSyC1LdqTsA0TtB0yEJdJg2pGZZf8pXZTnic'}
        libraries={["places"]}        
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>                
          <Button variant="contained" onClick={traceRoute}>
            Trace Route
          </Button>                                   
        </Box>

        <div>
          <div>
            <label>Distance: </label>
            <label> {distance}</label>
          </div>
          <div>
            <label>Duration: </label>
            <label> {duration}</label>
          </div>
        </div>

        <GoogleMap
          onLoad={onMapLoad}
          mapContainerStyle={{ width: "100%", height: "80%", marginTop: 10 }}
          center={position}
          zoom={15}        
        >
          { addressOrigin && <Marker position={addressOrigin} />}
          { addressDestiny && <Marker position={addressDestiny} />}

          {origin && destination && (
            <DirectionsService
              options={directionsServiceOptions}
              callback={directionsCallback}
            />
          )}
          {response && directionsRendererOptions && (
            <DirectionsRenderer options={directionsRendererOptions} />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;