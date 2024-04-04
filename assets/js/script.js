const key = 'a9d59121cb4743ac9edb7c6853265cb9'
const url = 'https://api.geoapify.com/v2/places?'

fetch(`${url}categories=airport,healthcare&filter=place:519951e2299a6f56c0590e7ff21c36bc4540f00101f901cbd4030000000000c0020792030835333931332b7573&apiKey=${key}`)
.then(function(response){
    return response.json()
})
.then(function(data){
    console.log(data)
})