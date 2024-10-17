geoLoc = async () => {
    let locations;
    await axios.get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson")
    .then((response)=>{
        console.log("Earthuake response >>> ", response.data)
        locations = response.data;

    })
    return locations;
}