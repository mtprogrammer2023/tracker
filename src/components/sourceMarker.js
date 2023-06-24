import { useMapEvents } from "react-leaflet";
import L from "leaflet";
import marker from './source.png';

const  icon = new L.Icon({
    iconUrl: marker,
    iconSize:[60,60]
});

const SourceMarker = (props) => {
    const map = useMapEvents({
        click: (e) => {
          if (props.isSourceMarker) {
            
            const { lat, lng } = e.latlng;
            console.log(e.latlng);
            const m = new L.marker([lat, lng], { icon ,  draggable: "true" }).addTo(map);
            props.setSourceCity({ lat, lng });
  
            m.on("dragend", function (event) {
              var marker = event.target;
              var position = marker.getLatLng();
              props.setSourceCity({ lat: position.lat, lng: position.lng });
            });
             
            props.setIsSourceMarker(false);

          }
        },
      });
  
      
}
 
export default SourceMarker;