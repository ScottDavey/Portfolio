
var main = {
	init: function () {
		var wrapper, header, screenHeight, navItems, activeNavItem;

		// Set background sizing and header margin on load
		wrapper = $('#wrapper');
		header = $('#header');
		screenHeight = screen.height;
		wrapper.css('background-size', '100%, ' + screenHeight + 'px');
		header.css('margin-top', (screenHeight / 2) - header.height());

		// Bind an on click event to the nav items
		navItems = $('.navItem');
		activeNavItem = navItems.filter('.active');
		navItems.on('click', main.onNavClick);
		activeNavItem.trigger('click');

		$(window).on('resize', main.onWindowResize);
	},
	onNavClick: function () {
		var that, x, curActiveItem, navActiveInd;
		that = $(this);
		// If we've called this function without a nav item click event, use the current active nav item
		// if (typeof that === 'object') that = $('.navItem.active');
		// Get x position of clicked element
		x = that.position().left;
		// de-activate old nav item
		curActiveItem = $('li.active');
		curActiveItem.removeClass('active');		
		// Activate clicked nav item
		that.addClass('active');
		// Get our active indicator and animate it sliding over to the clicked nav item
		navActiveInd = $('#nav_active_ind');
		navActiveInd.animate({left: [x, 'swing']}, 500, function () { });
	},
	onWindowResize: function () {
		// This function will be responsible for resizing and repositioning everything. Below a certain width, the display will switch to phone/tablet
		// Since our window has been resized, we need to reposition our nav active indicator
		main.onNavClick();
	}
};


$(document).ready(main.init);