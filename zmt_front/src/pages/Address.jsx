import { Box } from "@mui/material";
import React from "react";

function Address(props) {
return(
    <div id="map" style="width:100%;height:350px;"></div>
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };
    var map = new kakao.maps.Map(mapContainer, mapOption); 
    )
}
export default Address;
