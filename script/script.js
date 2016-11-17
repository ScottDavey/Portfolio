
var main = {
	init: function () {
		var header, screenHeight, navItems, activeNavItem;

		// Set background sizing and header margin on load
		header = $('#header');
		screenHeight = screen.height;
		header.css('margin-top', (screenHeight / 2) - header.height());

		// Bind an on click event to the nav items
		navItems = $('.navItem');
		activeNavItem = navItems.filter('.active');
		navItems.on('click', main.navigation.onNavClick);
		activeNavItem.trigger('click');

		$(window).on('resize', main.onWindowResize);
		main.onWindowResize();
	},
	navigation: {
		onNavClick: function () {
			var that, x, curActiveItem, navActiveInd;
			that = $(this);
			// Get x position of clicked element
			x = that.position().left;
			// de-activate old nav item
			curActiveItem = $('#nav li.active');
			curActiveItem.removeClass('active');		
			// Activate clicked nav item
			that.addClass('active');
			// Get our active indicator and animate it sliding over to the clicked nav item
			navActiveInd = $('#nav_active_ind');
			navActiveInd.animate({left: [x, 'swing']}, 500);
		}
	},
	onWindowResize: function () {
		var theWindow, bg, apectRatio, curNavItem, navActiveInd;

		// Get the window and the aspect ratio of the Background
		theWindow = $(window);
		bg = $('#bg');
		aspectRatio = bg.width() / bg.height();
		
		// Check to see if the window is greater in width or height. Apply the proper class
		if ((theWindow.width() / theWindow.height()) < aspectRatio) {
			bg.removeClass().addClass('bgHeight');
		} else {
			bg.removeClass().addClass('bgWidth');
		}

		// Fix the nav active indicator
		curNavItem = $('#nav li.active');
		navActiveInd = $('#nav_active_ind');
		navActiveInd.css('left', curNavItem.position().left);
	}
};


$(document).ready(main.init);