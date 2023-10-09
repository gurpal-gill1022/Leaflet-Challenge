//Store our API endpoint as Query URL.
let queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

 // Create our map
 let myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 5,
});

// Create tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);


// Create a function to set color markers based on size of each earthquake.
function getColor(size) {
  if (size <= 10) {
      return 'yellow'; 
  } else if (size <= 30) {
      return 'green'; 
  } else if (size <= 50) {
      return 'orange'; 
  } else if (size <= 70) {
      return 'red'; 
  } else if (size <= 90) {
      return 'violet'; 
  } else {
      return 'black'; 
  }
}

// Load the earthquake data from queryURL and add the data markers.
d3.json(queryURL).then(function (data) {
  data.features.forEach(function (earthquake) {
    let magnitude = earthquake.properties.mag;
    let coordinates = earthquake.geometry.coordinates;
    let place = earthquake.properties.place;
    let depth = earthquake.geometry.coordinates[2];
    let time = earthquake.properties.time; 
    let date = new Date(time);
    
    // Create a circle marker
    let marker = L.circleMarker([coordinates[1], coordinates[0]], {
      radius: magnitude * 5,
      fillColor: getColor(depth),
      color: 'white',
      weight: 1,
      opacity: 0.8,
      fillOpacity: 0.75
      });

    // Create the popup  with information
    let popup = `<strong>Magnitude:</strong> ${magnitude}<br><strong>Place:</strong> ${place}<br><strong>Depth:</strong> ${depth} km<br><strong>Time:</strong> ${date}`;

    // Add the popup
    marker.bindPopup(popup).addTo(myMap);
      
  });
});

