async function getLocation(){
    let taxiLocations;
    await axios.get("https://api.data.gov.sg/v1/transport/taxi-availability")
    .then(
        (response)=>{
            taxiLocations = response["data"]["features"][0]["geometry"]["coordinates"]
            console.log("from taxi.js, taxiLocations >>> ", taxiLocations);
            
        }
    )
    return taxiLocations;
}