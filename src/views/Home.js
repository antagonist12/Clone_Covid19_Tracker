import React, { useState , useEffect } from 'react';
import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core';
import InfoBox from '../components/InfoBox';
import Map from '../components/Map';
import Table from '../components/Table';
import {sortData , prettyPrintStat}from '../util';
import LineGraph from '../components/LineGraph';
import "leaflet/dist/leaflet.css";

function Home() {
    // State untuk ngambil API untuk Looping dropdown
    const [countries, setCountries] = useState([]);
    // State Country default
    const [country, setCountry] = useState("worldwide");
    // State info individual contry
    const [countryInfo, setCountryInfo] = useState([]);
    // State table Data
    const [tableData, setTableData] = useState([]);
    // State map
    const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
    const [mapZoom, setMapZoom] = useState(3);
    // State map circle
    const [mapCountries, setMapCountries] = useState([]);
    // State casestype
    const [casesType, setCasesType] = useState('cases');


    // UseEffect menjalankan code berdasarakan kondisi yang diberikan
    // ! kalau useEffect di bagian akhir tidak ada [] < valuenya, maka ini akan dieksekusi sekali load
    useEffect(() => {
        // Fetch API tanpa AXIOS
        const getCountriesData = async () =>{
            await fetch("https://disease.sh/v3/covid-19/countries")
            .then((res) => res.json())
            .then((data)=>{
                const countries = data.map((country) => (
                    {
                        name: country.country, 
                        value: country.countryInfo.iso2
                    }
                ));

                //* sorting function berdasarkan cases ada di util.js
                const sortedData = sortData(data);
                setTableData(sortedData);
                setCountries(countries);
                setMapCountries(data);
            })
        };
        getCountriesData();
    }, [])

    // mengload informasi ketika pertama kali di load
    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
        .then((res) => res.json())
        .then((data) => {
            setCountryInfo(data);
        });
    }, []);

    // function
    const onCountryChange = async (e) => {
        const countryCode = e.target.value;
        // setCountry(countryCode);

        // get data ( setiap combo boxnya ganti negara )
        const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(url)
        .then((res) => res.json())
        .then((data) => {
            setCountry(countryCode);
            // All of data / info dari negara itu
            setCountryInfo(data);
            // console.log(data
            setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
            setMapZoom(4);
        })
    };

    return (
    <div className="homeContent">
        <div className="leftside">
            <div className="header">
                <h1>Clone 19 Tracker</h1>
                <FormControl className="dropdown_item">
                    <Select variant="outlined"
                    onChange={onCountryChange}
                    value={country}>
                    {/* Looping Lewat API dan ngambil Countrynya Dengan State */}
                    <MenuItem value="worldwide">Worldwide</MenuItem>
                    {
                        countries.map(country =>  (
                        <MenuItem value={country.value}>{country.name}</MenuItem>
                        ))
                    }
                    </Select>
                </FormControl>
            </div>

            <div className="card_status">
                <InfoBox
                isRed
                active={casesType === "cases"}
                onClick={e => setCasesType('cases')} 
                title="Coronavirus Cases" 
                cases={prettyPrintStat(countryInfo.todayCases)} 
                total={prettyPrintStat(countryInfo.cases)} />

                <InfoBox 
                active={casesType === "recovered"}
                onClick={e => setCasesType('recovered')}
                title="Recovered" 
                cases={prettyPrintStat(countryInfo.todayRecovered)} 
                total={prettyPrintStat(countryInfo.recovered)} />

                <InfoBox
                isBlack
                active={casesType === "deaths"}
                onClick={e => setCasesType('deaths')}
                title="Death" 
                cases={prettyPrintStat(countryInfo.todayDeaths)} 
                total={prettyPrintStat(countryInfo.deaths)} />
            </div>

            <Map casesType={casesType} center={mapCenter} zoom={mapZoom} countries={mapCountries}/>
        </div>

        <Card className="rightside">
            <CardContent>
                <h3>Live Cases by Country</h3>
                    <Table countries={tableData} />
                <h3 className="graph_title">Worldwide New {casesType} </h3>
                    <LineGraph className="graph" casesType={casesType} />
            </CardContent>
        </Card>

    </div>
    )
}

export default Home
