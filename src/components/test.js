import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Autocomplete, Paper, TextField, Button, Box, Popper } from "@mui/material";

function Test() {
  const [opts, setOptions] = useState([]);
  const previousController = useRef();

  const getData = (searchTerm) => {
    fetch(
      "https://exam.pishgamanasia.com/webapi/Request/GetVehicleUsers?SearchTerm=" +
        searchTerm +
        "&UserToken=7f5a46e2",
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
            return { name: p.name };
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

  return (
    <div className="leaflet-container">
      <div className="">
        <div className="absolute w-80 items-center bg-white inset-x-1/2 bottom-0 h-60 p-2 z-[9999]">
          <Autocomplete
            id="dasdasd"
            options={opts}
            onInputChange={onInputChange}
            style={{ position: 'relative', }} 
            PopperComponent={(props) => {
                //const { className, anchorEl, style, ...rest } = props
               // const bound = anchorEl.getBoundingClientRect()
                return <Popper {...props} style={{
                  position: 'absolute',
                  zIndex: 9999,
                  width: '15%'
                }} />
              }}
            getOptionLabel={(option) => option.name}
            noOptionsText={'موردی یافت نشد'}
            renderInput={(params) => (
              <TextField {...params} label="ماشین آلات" variant="outlined"  />
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default Test;
