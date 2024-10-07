import {divIcon} from "leaflet";
import {VideoCameraFilled} from "@ant-design/icons";
import {renderToStaticMarkup} from "react-dom/server";

export function MapMarkerIconBuilder(color) {
    const iconMarkup = renderToStaticMarkup(
        <VideoCameraFilled style={{fontSize:26,color:color}}/>
    );
    return divIcon({
        html: iconMarkup
    });
}