import React from "react";
import numeral from "numeral";
import {Circle, Popup} from "react-leaflet";

const caseTypeColors = {
    cases: {
        hex: "#CC1034", // color
        // rgb: "rgb(204,16,52)",  rgb color
        // half_op: "rgba(204,16,52,0.5)", half opacity of the border bisa di gunakan di chart
        multiplier: 800, //size circle
    },
    recovered: {
        hex: "#7dd71d",
        // rgb: "rgb(125,215,29)",
        // half_op: "rgba(125,215,29,0.5)",
        multiplier: 1200,
    },
    deaths: {
        hex: "#FB4443",
        // rgb: "rgb(251,68,67)",
        // half_op: "rgba(251,68,67,0.5)",
        multiplier: 2000,
    }
}

//* fungsi sorting data ES6 berdasarkan cases
export const sortData = (data) => {
    const sortedData = [...data];
    // cara panjangnya gini
    // sortedData.sort((a,b) => {
    //     if(a.cases > b.cases){
    //         return -1;
    //     }else {
    //         return 1;
    //     }
    // })
    // return sortedData;
    
    // cara ternarynya gini
    return sortedData.sort((a,b) => (a.cases > b.cases ? -1 : 1));
}

// 
export const prettyPrintStat = (stat) => stat ? `+${numeral(stat).format("0.0a")}` : "+0";


//* buat circle dalam map
export const showDataOnMap = (data, casesType='cases') => (
    data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={caseTypeColors[casesType].hex}
            fillColor={caseTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) * caseTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <div className="info-map">
                    <div className="info-flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }} />
                    <div className="info-name">{country.country}</div>
                    <div className="info-cases">Cases: {numeral(country.cases).format("0,0")}</div>
                    <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ))
);