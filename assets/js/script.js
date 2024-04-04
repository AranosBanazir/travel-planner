const key = 'a9d59121cb4743ac9edb7c6853265cb9'



//function to get geoid: use https://api.geoapify.com/v1/geocode
    function getGeoId(place){
        fetch(`https://api.geoapify.com/v1/geocode/search?text=${place}&apiKey=${key}`)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            const id = data.features[0].properties.place_id
            getLocalInformation(id)
        })   
    }


getGeoId('baraboo')

function getLocalInformation(id){

fetch(`https://api.geoapify.com/v2/places?categories=airport,healthcare&filter=place:${id}&apiKey=${key}`)
.then(function(response){
    return response.json()
})
.then(function(data){
    const locations = data.features
    console.log(locations)
    for(let i=0; i < locations.length; i++){
        if (locations[i].properties.name === undefined){
            console.log(locations[i].properties.address_line1)
        }else{
        console.log(locations[i].properties.name)
        }
    }
})

}