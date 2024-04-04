const key = 'a9d59121cb4743ac9edb7c6853265cb9'

const options = $('input:checked')

console.log(options.dataset)
//function to get geoid: use https://api.geoapify.com/v1/geocode
    function getGeoId(place){
        fetch(`https://api.geoapify.com/v1/geocode/search?text=${place}&apiKey=${key}`)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            const id = data.features[0].properties.place_id
            console.log(data.features[0])

            initMap(data.features[0].properties.lat, data.features[0].properties.lon)
            getLocalInformation(id)
        })   
    }




function getLocalInformation(id){

     

fetch(`https://api.geoapify.com/v2/places?categories=${categories}&filter=place:${id}&apiKey=${key}`)
.then(function(response){
    return response.json()
})
.then(function(data){
    const locations = data.features
    console.log(locations)
    for(let i=0; i < locations.length; i++){
        if (locations[i].properties.name === undefined){
            console.log(locations[i].properties.address_line1)
            newMarker(`${locations[i].properties.address_line1}`, 'feature', locations[i].geometry.coordinates[1], locations[i].geometry.coordinates[0] )
        }else{
        console.log(locations[i].properties.name)
        newMarker(`${locations[i].properties.name}`, 'feature', locations[i].geometry.coordinates[1], locations[i].geometry.coordinates[0] )
        }
    }
})

}


let map;

async function initMap(lat, lon) {

  console.log(typeof lat, typeof lon)
  const position = { lat: lat, lng: lon };
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    zoom: 10,
    center: position,
    mapId: "123456",
  });


}

let markercount = 1
async function newMarker(location, type = 'feature', lat, lon){
    const position = { lat: lat, lng: lon };
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const {PinElement} = await google.maps.importLibrary("marker")
    let style = {}

    //set style of pin based on type
        if (type === 'feature'){
            style = {
                background: 'red',
                borderColor: 'black',
                glyph: `${markercount++}`,   
            }
        }else if (type === 'c'){

        }






    const pin = new PinElement(style)

  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: `${location}`,
    content: pin.element

   
  });
}

function handleSubmit(e){
    const search = document.getElementById('search')
    const map = document.getElementById('map')
    e.preventDefault()
    getGeoId(search.value)
    map.innerHTML = ''
}

document.querySelector('form').addEventListener('submit', handleSubmit)