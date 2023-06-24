import { useState, useEffect } from "react";
import {
  Autocomplete,
  Paper,
  TextField,
  Button,
  Box,
  Popper,
} from "@mui/material";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../App.css";
// import useGeoLocation from "./useGeoLocation";
// import Routing from "./rounting";
import { getToken } from "./session";
import DestinationMarker from "./destinationMarker";
import SourceMarker from "./sourceMarker";

function Dashboard() {
  const [center, setCenter] = useState({ lat: 35.7624, lng: 51.3916 });
  const [cities, setCities] = useState([]);
  const [sourceCity, setSourceCity] = useState({});
  const [destinationCity, setDestinationCity] = useState({});
  const [vehicle, setVehicle] = useState(0);

  const [userLogged, setUserLogged] = useState(getToken());
  const [err, setError] = useState();

  const [loading, setLoading] = useState(false);

  const [opts, setOptions] = useState([]);

  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [isSourceMarker, setIsSourceMarker] = useState(true);
  const [isDestinationMarker, setIsDestinationMarker] = useState(true);

  const [itemList, setItemList] = useState([]);

 
  const getData = async (searchTerm) => {
    await fetch(
      "https://exam.pishgamanasia.com/webapi/Request/GetVehicleUsers?SearchTerm=" +
        searchTerm +
        "&UserToken=" +
        userLogged,
      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        if (myJson.data) {
          console.log(
            "search term: " + searchTerm + ", results: ",
            myJson.data
          );
          const updatedOptions = myJson.data.map((p) => {
            return { name: p.name, id: p.id };
          });
          setOptions(updatedOptions);
        }
      });
  };

  const onInputChange = (event, value, reason) => {
    if (value) {
      getData(value);
    } else {
      setOptions([]);
    }
  };

  const myIcon = L.icon({
    iconUrl: require("../marker.svg"),
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
  });

  const handleSubmiit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const latlng1 = sourceCity.lat + "," + sourceCity.lng;
    const latlng2 = destinationCity.lat + "," + destinationCity.lng;
    console.log(vehicle);
    if (vehicle > 0) {
      const response = await fetch(
        "https://exam.pishgamanasia.com/webapi/Request/SendRequest",
        {
          method: "POST",
          body: JSON.stringify({
            userToken: userLogged,
            vehicleUserTypeId: vehicle,
            source: latlng1,
            destination: latlng2,
          }),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const data = await response.json();
      setLoading(false);
      setError("ثبت با موفقیت انجام شد");
      console.log(data);
    } else {
      setLoading(false);
      setError("فیلد ماشین آلات الزامی است");
    }
  };

  useEffect(() => {
    console.log(getToken());
    getToken();
  }, []);

  return (
    <div className="leaflet-container">
      <div className="">
        <div className="absolute w-96 items-center bg-white inset-x-1/2 bottom-0 h-96 p-2 z-[9999]">
          {err && (
            <>
              <div role="alert">
                <div class="bg-orange-500 text-white font-bold rounded-t px-4 py-2 text-end">
                  {err}
                </div>
              </div>
              <br />
            </>
          )}

          <button
            type="button"
            className="text-white w-full bg-red-500 hover:bg-gray-100 justify-end border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-xl px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
          >
            مبدا :
            <>
              {sourceCity.lat
                ? Number(sourceCity.lat).toFixed(7) +
                  " , " +
                  Number(sourceCity.lng).toFixed(7)
                : ""}
            </>
            <svg
              class="h-6 w-6 text-white "
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              ></path>
            </svg>
          </button>

          <button
            type="button"
            className="text-white w-full bg-green-500 hover:bg-gray-100 justify-end border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-xl px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
          >
            مقصد :
            <>
              {destinationCity.lat
                ? Number(destinationCity.lat).toFixed(7) +
                  " , " +
                  Number(destinationCity.lng).toFixed(7)
                : ""}
            </>
            <svg
              class="h-6 w-6 text-white "
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              ></path>
            </svg>
          </button>

          <Autocomplete
            dir="rtl"
            id="VehicleUserTypeId"
            name="VehicleUserTypeId"
            options={opts}
            onChange={(event, value) => {
              value ? setVehicle(value.id) : setVehicle(0);
            }}
            onInputChange={onInputChange}
            style={{
              position: "relative",
              marginBottom: "10px",
              direction: "rtl",
            }}
            PopperComponent={(props) => {
              return (
                <Popper
                  {...props}
                  style={{
                    position: "absolute",
                    zIndex: 9999,
                    width: "15%",
                  }}
                />
              );
            }}
            getOptionLabel={(option) => option.name}
            noOptionsText={"موردی یافت نشد"}
            renderInput={(params) => (
              <TextField {...params} label="ماشین آلات" variant="outlined" />
            )}
          />

          <Button
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            type="submit"
            disabled={disabledSubmit}
            onClick={handleSubmiit}
          >
            {loading ? "در حال بارگذاری ..." : "ثبت درخواست"}
          </Button>
        </div>

        <MapContainer
          center={[center.lat, center.lng]}
          zoom={13}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* {location.loaded && !location.error && (
          <Marker icon={myIcon} position={[location.coordinates.lat, location.coordinates.lng]}></Marker>
        )} */}
          {/* {Object.keys(sourceCity).length > 0 &&
            Object.keys(destinationCity).length > 0 && (
              <Routing
                sourceCity={sourceCity}
                destinationCity={destinationCity}
              />
            )} */}

          <SourceMarker
            isSourceMarker={isSourceMarker}
            setSourceCity={setSourceCity}
            setIsSourceMarker={setIsSourceMarker}
          />
          <DestinationMarker
            isSourceMarker={isSourceMarker}
            setIsDestinationMarker={setIsDestinationMarker}
            isDestinationMarker={isDestinationMarker}
            setDisabledSubmit={setDisabledSubmit}
            setDestinationCity={setDestinationCity}
          />
        </MapContainer>
      </div>
    </div>
  );
}

export default Dashboard;
