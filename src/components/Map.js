import React from 'react';
import '../Map.css';
import {Map as LeafletMap, TileLayer} from 'react-leaflet';
import { showDataOnMap } from '../util';

function Map({countries, center , zoom, casesType }) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreeetMap</a> contributors'
                />
                {/* Loop circle */}
                {showDataOnMap(countries, casesType)}
            </LeafletMap>
        </div>
    )
}

export default Map
