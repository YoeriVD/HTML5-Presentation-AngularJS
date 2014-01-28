window.onload = getMyLocation;
var map = null;

function getMyLocation() {
    //is er geolocatie?
    if (navigator.geolocation) {
        //wat is mijn positie, op succes laat dit zien, op error.. toon de error
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    } else {
        alert("No geolocation support ...");
    }
}

function displayLocation(position) {
    //haal de coordinaten op
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    //toon deze in de browser
    var div = document.getElementById("location");
    div.innerHTML = "U bent op latitude: " + latitude + ", longitude: " + longitude;
    div.innerHTML += " (met " + position.coords.accuracy + " meter precisie)";

    //locatie van kantoor in mechelen
    var ourCoords = {
        latitude: 51.053045,
        longitude: 4.454932
    };

    //bereken afstand (met een methode die ik zelf ook opgezocht heb)
    var km = computeDistance(position.coords, ourCoords).toFixed(2);
    var distance = document.getElementById("distance");
    distance.innerHTML = "U bent " + km + " km van het Info Support HQ";

    //toon deze op de kaart
    showMap(position.coords);

}

//haal een google map op adhv coordinaten
function showMap(coords) {
    var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);
    var mapOptions = {
        zoom: 10,
        center: googleLatAndLong,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };

    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv, mapOptions);

    //een marker toevoegen voor onze locatie
    var title = "Uw locatie";
    var content = "U bent hier: " + coords.latitude + ", " + coords.longitude;
    addMarker(map, googleLatAndLong, title, content);
}

//code om een marker op het mapje te plaatsen
function addMarker(map, latlong, title, content) {

    var markerOptions = {
        position: latlong,
        map: map,
        title: title,
        clickable: true
    };

    var marker = new google.maps.Marker(markerOptions);

    var infoWindowOptions = {
        content: content,
        position: latlong
    };

    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

    google.maps.event.addListener(marker, "click", function () {
        infoWindow.open(map);
    });
}

function displayError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };

    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.coode == 2) {
        errorMessage = errorMessage + " " + error.message;
    }

    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

/*
* Trust me, I'm an engineer
*/
function computeDistance(startCoords, destCoords) {
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);

    var radius = 6371;
    //radius of the earth
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + Math.cos(startLatRads) * Math.cos(destLatRads) * Math.cos(startLongRads - destLongRads)) * radius;

    return distance;
}

function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI) / 180;
    return radians;
};

