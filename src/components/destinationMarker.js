import { useMapEvents } from "react-leaflet";
import L from "leaflet";
import marker from './destination.png';
const  icon = new L.Icon({
    iconUrl: marker,
    iconSize:[60,60]
});

const DestinationMarker = (props) => {
    const map = useMapEvents({
        click: (e) => {
          if (!props.isSourceMarker) {
            if (props.isDestinationMarker) {
                props.setDisabledSubmit(false);
              const { lat, lng } = e.latlng;
              console.log(e.latlng);
              const mn = new L.marker([lat, lng], { icon , draggable: "true" }).addTo(
                map
              );
              props.setDestinationCity({ lat, lng });
  
              mn.on("dragend", function (event) {
                var marker = event.target;
                var position = marker.getLatLng();
                console.log(position.lat, position.lng);
                props.setDestinationCity({ lat: position.lat, lng: position.lng });
              });
  
              props.setIsDestinationMarker(false);
            }
          }
        },
      });
  
      return null;
}
 
export default DestinationMarker;