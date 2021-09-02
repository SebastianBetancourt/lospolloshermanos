	//Sticky_nav 
	  $(document).ready(function(){
		$(".cc-navbar").sticky({topSpacing:0});
	  });
 
	//Scroll Spy
  $(document).ready(function(){	
	$('body').scrollspy({ target: '.cc-navbar' })
  });	

  //Smoth scroll
  $(document).ready(function(){	
	//smooth scrolling to all links
	$("a").on('click', function(event) {
	if (this.hash !== "") {
			// Prevent default anchor click behavior
			event.preventDefault();

			// Store hash
			var hash = this.hash;

			$('html, body').animate({
			scrollTop: $(hash).offset().top
			}, 1000, function(){
			window.location.hash = hash;
			});
		} // End if
	});	});	
	
	//Tab
		function openCity(evt, cityName) {
			var i, tabcontent, tablinks;
			tabcontent = document.getElementsByClassName("tabcontent");
			for (i = 0; i < tabcontent.length; i++) {
				tabcontent[i].style.display = "none";
			}
			tablinks = document.getElementsByClassName("tablinks");
			for (i = 0; i < tablinks.length; i++) {
				tablinks[i].className = tablinks[i].className.replace(" active", "");
			}
			document.getElementById(cityName).style.display = "block";
			evt.currentTarget.className += " active";
		}

		// Get the element with id="defaultOpen" and click on it
		document.getElementById("defaultOpen").click();	
	
	
	
		//Slick Slider
		$('.carousel-full-box').slick({
		  dots: true,
		  infinite: true,
		  speed: 500,
		  slidesToShow: 1,
		  adaptiveHeight: true

		});


	//WOW JS
	new WOW().init();
	
