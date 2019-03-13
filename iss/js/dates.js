var findDate = dates => {
    var result = null;
    dates.forEach(dateSet => {
        dateSet.forEach(date => {
            if (!result || result.risetime > date.risetime && date.risetime > Date.now()) {
                result = date;
            }
        });
    });
    return result;
}

var main = () => {
    var chosenOne = findDate(dates);

    var myIcon = L.icon({
        iconUrl: "img/iss.svg",
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [-3, -76],
    });

    macarte = L.map('map').setView([chosenOne.latitude, chosenOne.longitude], 3);
    marker = L.marker([chosenOne.latitude, chosenOne.longitude], { icon: myIcon }).addTo(macarte);
    marker.bindPopup(chosenOne.name);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(macarte);
    
    document.getElementById('title').innerHTML = "The ISS will be near " + chosenOne.name + " the " + new Date(chosenOne.risetime * 1000).toLocaleString('en-GB', { timeZone: 'Europe/Paris' });
}

window.onload = () => main();