import React, { useRef, useState } from "react";

import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer
} from "@react-google-maps/api";



export default function App() {
  const [directions, setDirections] = useState<google.maps.DirectionsResult>();
  const count = useRef(0);

  const directionsCallback = (
    result: google.maps.DirectionsResult,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === "OK" && count.current === 0) {
      count.current++;
      console.count();
      setDirections(result);
    }
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <GoogleMap
        mapContainerClassName="w-full h-full"
        mapContainerStyle={{ height: "300px" }}
        zoom={7}
      >
        <DirectionsService
          options={{
            origin: "Corrientes",
            destination: "Buenos Aires",
            travelMode: google.maps.TravelMode.DRIVING
          }}
          callback={directionsCallback}
        />
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
}
