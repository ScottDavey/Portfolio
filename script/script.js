
var main = {
	init: function () {
		var header, screenHeight, navItems, activeNavItem;

		// Bind an on click event to the nav items
		navItems = $('.navItem');
		activeNavItem = navItems.filter('.active');
		navItems.on('click', main.navigation.onNavClick);
		activeNavItem.trigger('click');

		// Update display on window resize
		$(window).on('resize', main.onWindowResize);
	},
	navigation: {
		onNavClick: function () {
			var thisEl, x, curActiveItem, navActiveInd, targetDiv;
			thisEl = $(this);

			// SMOOTH PAGE SCROLL
			targetDiv = $('#' + thisEl.html().toLowerCase());
			if (targetDiv.length > 0) {
				$('html, body').animate({
					scrollTop: Math.abs(targetDiv.offset().top)
				}, 500);
			}

			// NAV ACTIVE INDICATOR ANIMATION
			// Get x position of clicked element
			x = thisEl.position().left;
			// de-activate old nav item
			curActiveItem = $('#nav li.active');
			curActiveItem.removeClass('active');		
			// Activate clicked nav item
			thisEl.addClass('active');
			// Get our active indicator and animate it sliding over to the clicked nav item
			navActiveInd = $('#nav_active_ind');
			navActiveInd.animate({left: [x, 'swing']}, 500);
		}
	},
	onWindowResize: function () {
		var curNavItem, navActiveInd;

		// Fix the nav active indicator
		curNavItem = $('#nav li.active');
		navActiveInd = $('#nav_active_ind');
		navActiveInd.css('left', curNavItem.position().left);
	}
};


$(document).ready(main.init);