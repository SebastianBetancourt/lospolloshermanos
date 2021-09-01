		function initialize() {
		  var map = new google.maps.Map(
			document.getElementById('map-canvas'), {
			  center: new google.maps.LatLng(37.4419, -122.1419),
			  scrollwheel: false,
			  zoom: 13,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			  
		  });

		  var marker = new google.maps.Marker({
				position: new google.maps.LatLng(37.4419, -122.1419),
				map: map
		  });

		}
		google.maps.event.addDomListener(window, 'load', initialize);