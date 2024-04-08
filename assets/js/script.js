const key = 'a9d59121cb4743ac9edb7c6853265cb9'


function getCategories(){
    const options = $('input:checked')
    const categories = []
    for (let i = 0; i< options.length; i++){
        categories.push(options[i].dataset.category)
    }
    
   return categories.toString()

}

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

    
    //fetch information from Geoapify
fetch(`https://api.geoapify.com/v2/places?categories=${getCategories()}&filter=place:${id}&limit=50&apiKey=${key}`)
.then(function(response){
    return response.json()
})
.then(function(data){
    const locations = data.features
    console.log(locations)
    for(let i=0; i < locations.length; i++){
        const categories = locations[i].properties.categories
        if (locations[i].properties.name === undefined){


                        
            if (categories.includes('healthcare')){
                newMarker(`${locations[i].properties.address_line1}`, 'healthcare', locations[i].geometry.coordinates[1], locations[i].geometry.coordinates[0] )
            }else if (categories.includes('catering')){
                newMarker(`${locations[i].properties.address_line1}`, 'catering', locations[i].geometry.coordinates[1], locations[i].geometry.coordinates[0] )
            }else if (categories.includes('accommodation')){
                newMarker(`${locations[i].properties.address_line1}`, 'accommodation', locations[i].geometry.coordinates[1], locations[i].geometry.coordinates[0] )
            }else if (categories.includes('airport')){
                newMarker(`${locations[i].properties.address_line1}`, 'airport', locations[i].geometry.coordinates[1], locations[i].geometry.coordinates[0] )
            }else if (categories.includes('entertainment')){
                newMarker(`${locations[i].properties.address_line1}`, 'entertainment', locations[i].geometry.coordinates[1], locations[i].geometry.coordinates[0] )
            }
        }else{
        //setting the type based on properties.categories containing the original types
            
            if (categories.includes('healthcare')){
                newMarker(`${locations[i].properties.name}`, 'healthcare', locations[i].geometry.coordinates[1], locations[i].geometry.coordinates[0] )
            }else if (categories.includes('catering')){
                newMarker(`${locations[i].properties.name}`, 'catering', locations[i].geometry.coordinates[1], locations[i].geometry.coordinates[0] )
            }else if (categories.includes('accommodation')){
                newMarker(`${locations[i].properties.name}`, 'accommodation', locations[i].geometry.coordinates[1], locations[i].geometry.coordinates[0] )
            }else if (categories.includes('airport')){
                newMarker(`${locations[i].properties.name}`, 'airport', locations[i].geometry.coordinates[1], locations[i].geometry.coordinates[0] )
            }else if (categories.includes('entertainment')){
                newMarker(`${locations[i].properties.name}`, 'entertainment', locations[i].geometry.coordinates[1], locations[i].geometry.coordinates[0] )
            }
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
    zoom: 13,
    center: position,
    mapId: "123456",
  });

  const mapEl = $('#map')
  mapEl.css('border-radius', '10px')
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
                glyph: `${markercount}`,
                glyphColor: 'white',   
            }
        }else if (type === 'catering'){
            style = {
                background: 'blue',
                borderColor: 'white',
                glyph: `${markercount}`,
                glyphColor: 'white',   
            }
        }else if (type === 'healthcare'){
            style = {
                background: 'green',
                borderColor: 'black',
                glyph: `${markercount}`,
                glyphColor: 'white',   
            }
        }else if (type === 'airport'){
            style = {
                background: 'pink',
                borderColor: 'black',
                glyph: `${markercount}`,
                glyphColor: 'white',   
            }
        }else if (type === 'entertainment'){
            style = {
                background: 'purple',
                borderColor: 'black',
                glyph: `${markercount}`,
                glyphColor: 'white',   
            }
        }else if (type === 'accommodation'){
            style = {
                background: 'white',
                borderColor: 'black',
                glyph: `${markercount}`,
                glyphColor: 'black',
            }
        }






    const pin = new PinElement(style)

  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: `${location}`,
    content: pin.element

   
  });

  const list = $('#places')
  const place = $(`<li>     ${markercount}. ${location}</li>`)
  place.css('background-color', style.background)
  place.css('color', style.glyphColor)
  place.appendTo(list)
 
  markercount++
}

function handleSubmit(e){
    const search = document.getElementById('search')
    const map = document.getElementById('map')
    const ol = document.getElementById('places')
    e.preventDefault()
    getGeoId(search.value)
    ol.innerHTML = ''
    map.innerHTML = ''
    markercount = 1
}

function handleLinkClick(e){
    const search = document.getElementById('search')
    const map = document.getElementById('map')
    const ol = document.getElementById('places')
    e.preventDefault()
    getGeoId(e.target.innerText)
    ol.innerHTML = ''
    map.innerHTML = ''
    markercount = 1
    // console.log(e.target.innerText)
}

    $('form').on('submit', handleSubmit)
    $('#map li').on('click', handleLinkClick)
