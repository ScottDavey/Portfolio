
var main = {
	init: function () {
		var wrapper, windowHeight, windowWidth, navHeight, navItem;
		wrapper = $('#wrapper');
		windowHeight = parseInt($(window).height(), 10);
		windowWidth = parseInt($(window).width(), 10);
		// Adjust the size of the background image to fit the screen size
		wrapper.css('background-size', windowWidth + 'px, ' + windowHeight + 'px');

		navItem = $('#nav ul li');
		navItem.on('click', main.onNavClick);
	},
	onNavClick: function () {
		var that, x, navActiveInd;
		that = $(this);
		x = that.position().left;
		navActiveInd = $('#nav_active_ind');
		navActiveInd.css('left', x);
	}


};


$(document).ready(main.init);