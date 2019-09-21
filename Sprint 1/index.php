<?php
/**
 * @Author Don Kushan Nilanga Athalage 
 * @Version 1.0.0
 */

    $file = file_get_contents('https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json');
    $data = json_decode($file);
    
    foreach ($data as $var)
    {
        //echo(print_r($var->bay_id, true));
    }
    
?>

<!DOCTYPE html>
<meta http-equiv="refresh" content="120" />
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <title>Simple Markers</title>
    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 100%;
      }
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 3,
          center: {lat: -28.024, lng: 140.887}
        });

        // Create an array of alphabetical characters used to label the markers.
        //var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        var markers = locations.map(function(location, i) {
          return new google.maps.Marker({
            position: location,
            label: "P"
          });
        });

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      }
      var locations = [
          <?php foreach ($data as $var){
            if($var->status=="Unoccupied"){?>
          {lat: <?php echo($var->lat);?>, lng:<?php echo($var->lon);?>},<?php }} ?>
      ]
    </script>
    <script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js">
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyChiDkgegCZ2_Jj9VMLlQJBDMmctCgXXy4&callback=initMap">
    </script>
  </body>
</html>