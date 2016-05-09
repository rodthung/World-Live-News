<<<<<<< HEAD
angular.module("newsApp")

.controller("mapController", function ($rootScope, $http) {
    function initialize() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 26.3351,
                lng: 17.2283
            },
            zoom: 3,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        // ----- Create the search box and link it to the UI element. ----- //
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function () {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach(function (marker) {
                marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function (place) {
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                }));

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });

        // ----- Mouseover Map Styles ----- //
        //Initialize JSONP request 
        var script = document.createElement('script');
        var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
        url.push('sql=');
        var query = 'SELECT name, kml_4326 FROM ' +
            '1foc3xO9DyfSIF6ofvN0kp2bxSfSeKog5FbdWdQ';
        var encodedQuery = encodeURIComponent(query);
        url.push(encodedQuery);
        url.push('&callback=drawMap');
        url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
        script.src = url.join('');
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(script);

        //get JSON News data
        var newsUrl = 'http://content.guardianapis.com/search?api-key=test';
        $http.get(newsUrl).then(function (result) {

            //console.log(result.data.response.results[0].webTitle);
        });

    } //end of initialize function 

    initialize();
});



function drawMap(data) {
    //var colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
    var color = '#3399FF';
    var rows = data['rows'];
    for (var i in rows) {
        if (rows[i][0] != 'Antarctica') {
            var newCoordinates = [];
            var geometries = rows[i][1]['geometries'];
            if (geometries) {
                for (var j in geometries) {
                    newCoordinates.push(constructNewCoordinates(geometries[j]));
                }
            } else {
                newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
            }
            //var randomnumber = Math.floor(Math.random() * 4);
            var id = rows[i][0];
            var country = new google.maps.Polygon({
                paths: newCoordinates,
                strokeColor: color,
                strokeOpacity: 9,
                strokeWeight: 0,
                fillColor: color,
                fillOpacity: 0
            });

            createPolygon(country, id)
                //Call createMarker() 
                /*
                setTimeout('createMarker("'+ id +'",map)', delay);
                createMarker(id, map); 
                */
            country.setMap(map);
        }
    }
}

function createPolygon(country, id) {
    google.maps.event.addListener(country, 'mouseover', function () {
        this.setOptions({
            fillOpacity: 0.3,
            strokeWeight: 3
        });
    });
    google.maps.event.addListener(country, 'mouseout', function () {
        this.setOptions({
            fillOpacity: 0,
            strokeWeight: 0
        });
    });

    google.maps.event.addListener(country, 'click', function () {
        var newsUrl = 'http://content.guardianapis.com/search?q=' + id + '&api-key=test';
        $.get(newsUrl, function (result) {

            console.log(result);

            var newHtml;

            //console.log(result.response);
            $('#news').empty();

            $('#news').append('<h2>News in: ' + id + '</h2>')
            for(var index in result.response.results) {
                //console.log(result.response.results[index].webTitle);

                newHtml = '';
                newHtml += '<div class="panel panel-default panel-body">';
                newHtml += result.response.results[index].webTitle;
                newHtml += '<a href="'+ result.response.results[index].webUrl +'" target="_blank"               class="btn btn-block btn-info btn-news" role="button">See more</a>';
                newHtml += '</div>';

                $('#news').append(newHtml);
            }
        })
    });
}

function constructNewCoordinates(polygon) {
    var newCoordinates = [];
    var coordinates = polygon['coordinates'][0];
    for (var i in coordinates) {
        newCoordinates.push(
            new google.maps.LatLng(coordinates[i][1], coordinates[i][0]));
    }
    return newCoordinates;
}


function getJSONNews() {
    var newsUrl = 'http://content.guardianapis.com/search?q=debates&api-key=fa684214-4f4e-4e21-9d16-3f228557cab6?callback=displayJSONNews';
    var script = document.createElement('script');
    script.src = newsUrl;
    document.body.appendChild(script);
}

function displayJSONNews(content) {
    document.getElementById('news').innerHTML = content;
}

=======
angular.module("newsApp")

.controller("mapController", function ($rootScope, $http) {
    function initialize() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: -33.8688,
                lng: 151.2195
            },
            zoom: 7,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        // ----- Create the search box and link it to the UI element. ----- //
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function () {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach(function (marker) {
                marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function (place) {
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                }));

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });

        // ----- Mouseover Map Styles ----- //
        //Initialize JSONP request 
        var script = document.createElement('script');
        var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
        url.push('sql=');
        var query = 'SELECT name, kml_4326 FROM ' +
            '1foc3xO9DyfSIF6ofvN0kp2bxSfSeKog5FbdWdQ';
        var encodedQuery = encodeURIComponent(query);
        url.push(encodedQuery);
        url.push('&callback=drawMap');
        url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
        script.src = url.join('');
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(script);

        //get JSON News data
        var newsUrl = 'http://content.guardianapis.com/search?api-key=test';
        $http.get(newsUrl).then(function (result) {

            //console.log(result.data.response.results[0].webTitle);
        });

    } //end of initialize function 

    initialize();
});



function drawMap(data) {
    //var colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
    var color = '#3399FF';
    var rows = data['rows'];
    for (var i in rows) {
        if (rows[i][0] != 'Antarctica') {
            var newCoordinates = [];
            var geometries = rows[i][1]['geometries'];
            if (geometries) {
                for (var j in geometries) {
                    newCoordinates.push(constructNewCoordinates(geometries[j]));
                }
            } else {
                newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
            }
            //var randomnumber = Math.floor(Math.random() * 4);
            var id = rows[i][0];
            var country = new google.maps.Polygon({
                paths: newCoordinates,
                strokeColor: color,
                strokeOpacity: 9,
                strokeWeight: 0,
                fillColor: color,
                fillOpacity: 0
            });

            createPolygon(country, id)
                //Call createMarker() 
                /*
                setTimeout('createMarker("'+ id +'",map)', delay);
                createMarker(id, map); 
                */
            country.setMap(map);
        }
    }
}

function createPolygon(country, id) {
    google.maps.event.addListener(country, 'mouseover', function () {
        this.setOptions({
            fillOpacity: 0.3,
            strokeWeight: 3
        });
    });
    google.maps.event.addListener(country, 'mouseout', function () {
        this.setOptions({
            fillOpacity: 0,
            strokeWeight: 0
        });
    });

    google.maps.event.addListener(country, 'click', function () {
        var newsUrl = 'http://content.guardianapis.com/search?q=' + id + '&api-key=test';
        $.get(newsUrl, function (result) {

            console.log(result);

            //console.log(result.response);
            $('#news').empty();
            for(var index in result.response.results) {
                //console.log(result.response.results[index].webTitle);
                $('#news').append('<div><h4>' + result.response.results[index].webTitle + '</h4></div>');
            }

            /*
            $.each(result, function (index) {
                $('#news').append('<p>' + result.response.results[0].webTitle + '</p>');
            });*/
            //$('#news').append('<p>' + result.response.results[0] + '</p>');
        })
    });
}

function constructNewCoordinates(polygon) {
    var newCoordinates = [];
    var coordinates = polygon['coordinates'][0];
    for (var i in coordinates) {
        newCoordinates.push(
            new google.maps.LatLng(coordinates[i][1], coordinates[i][0]));
    }
    return newCoordinates;
}


function getJSONNews() {
    var newsUrl = 'http://content.guardianapis.com/search?q=debates&api-key=fa684214-4f4e-4e21-9d16-3f228557cab6?callback=displayJSONNews';
    var script = document.createElement('script');
    script.src = newsUrl;
    document.body.appendChild(script);
}

function displayJSONNews(content) {
    document.getElementById('news').innerHTML = content;
}








//Create Marker
/*
var delay = 100;
function createMarker(id, resultsMap) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': id
    }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
        } else {
            if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                delay++;
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }

        }
    });

}*/
>>>>>>> 28af370dab4d74096807671e9d45b621b9fc643b
