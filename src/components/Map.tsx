import React from "react";
import {
  GoogleMap,
  Marker,
  LoadScript,
  StandaloneSearchBox,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";



export interface MapPageProps {}

const Map = () => {
  const [map, setMap] = React.useState<google.maps.Map>();
  const [searchBoxA, setSearchBoxA] =
    React.useState<google.maps.places.SearchBox>();
  const [searchBoxB, setSearchBoxB] =
    React.useState<google.maps.places.SearchBox>();
  const [pointA, setPointA] = React.useState<google.maps.LatLngLiteral>({
    lat: -19.86457662276789,
    lng: -43.922225062216214,
  });
  const [pointB, setPointB] = React.useState<google.maps.LatLngLiteral>({
    lat: -17.052071242898926,
    lng: -42.65160969215514,
  });

  const [origin, setOrigin] = React.useState<google.maps.LatLngLiteral | null>(
    null
  );
  const [destination, setDestination] =
    React.useState<google.maps.LatLngLiteral | null>(null);

  const [response, setResponse] =
    React.useState<google.maps.DistanceMatrixResponse | null>(null);

  const position = {
    lat: -27.590824,
    lng: -48.551262,
  };

  const onMapLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const onLoadA = (ref: google.maps.places.SearchBox) => {
    setSearchBoxA(ref);
  };

  const onLoadB = (ref: google.maps.places.SearchBox) => {
    setSearchBoxB(ref);
  };

  const onPlacesChangedA = () => {
    const places = searchBoxA!.getPlaces();
    console.log("places by addres"+JSON.stringify(places));
    const place = places![0];
    const location = {
      lat: place?.geometry?.location?.lat() || 0,
      lng: place?.geometry?.location?.lng() || 0,
    };
    setPointA(location);
    setOrigin(null);
    setDestination(null);
    setResponse(null);
    map?.panTo(location);
  };
  
  const locationA = {
    lat: -19.86457662276789,
    lng: -43.922225062216214,
  };
  //setPointA(locationA);
  
  const locationB = {
    lat: -17.052071242898926,
    lng: -42.65160969215514,
  };
  //setPointB(locationB);

  const onPlacesChangedB = () => {
    const places = searchBoxB!.getPlaces();
    console.log(places);
    const place = places![0];
    const location = {
      lat: place?.geometry?.location?.lat() || 0,
      lng: place?.geometry?.location?.lng() || 0,
    };
    setPointB(location);
    setOrigin(null);
    setDestination(null);
    setResponse(null);
    map?.panTo(location);
  };

  const traceRoute = () => {
    if (pointA && pointB) {
      setOrigin(pointA);
      setDestination(pointB);
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

  const directionsCallback = React.useCallback((res) => {
    if (res !== null && res.status === "OK") {
      console.log("\n\n\n\n\n"+JSON.stringify(res));
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

          <div>
            <button onClick={traceRoute}>Traçar rota</button>
          </div>

        <GoogleMap
          onLoad={onMapLoad}
          mapContainerStyle={{ width: "100%", height: "100%", marginTop: 10 }}
          center={position}
          zoom={15}
        >


          {!response && pointA && <Marker position={pointA} />}
          {!response && pointB && <Marker position={pointB} />}

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