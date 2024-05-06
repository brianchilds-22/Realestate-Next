"use client";
import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import { setDefaults, fromAddress } from "react-geocode";
import Spinner from "./Spinner";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 11,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  //   from react-geocode npm site
  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY, // Your API key here.
    language: "en", // Default language for responses.
    region: "es", // Default region for responses.
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(`${property.location.street}
      ${property.location.city} ${property.location.state} ${property.location.zipcode}`);
        //   Check for results
        if (res.results.length === 0) {
          //  No results
          setGeocodeError(true);
          setLoading(false);
          return;
        }

        const { lat, lng } = res.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
        setLoading(false);
      }
    };
    fetchCoords();
  }, []);

  if (loading) return <Spinner loading={loading} />;

  if (geocodeError) {
    return <div className="text-xl">No location results found</div>;
  }

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{ longitude: lng, latitude: lat, zoom: 11 }}
        style={{ width: "100%", height: "350px" }}
        mapStyle="mapbox://
        styles/mapbox/streets-v11"
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <Image src={pin} width={30} height={30} alt="pin" />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
