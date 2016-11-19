
var main = {
	init: function () {
		var navItems, activeNavItem, theWindow, pageCoords;

		// Bind an on click event to the nav items
		navItems = $('.navItem');
		activeNavItem = navItems.filter('.active');
		navItems.on('click', main.navigation.onNavClick);

		// Update display on window resize
		theWindow = $(window);
		theWindow.on('resize', main.onWindowResize);
		
		// Store the Y coordinates of the tops of each page
		pageCoords = [];
		$('.page').each(function () {
			var page = $(this);
			pageCoords.push([page.attr('id'), page.position().top]);
		});
		main.navigation.pageCoords = pageCoords;

		// Handle the mouse wheel event (to update active indicator when scroll to a page)
		theWindow.on('mousewheel', main.navigation.onMouseWheelScroll);


		// Begin intro animation
		main.intro(activeNavItem);
	},
	intro: function (activeNavItem) {
		var introOveraly, introTitle, windowHeight;
		introOveraly = $('#intro_overlay');
		introTitle = $('#intro_title');
		windowHeight = $(window).height();
		// Animation: fade the black overlay out
		introOveraly.fadeOut(500, function () {
			// Animation: slide the title text up and fade in
			introTitle.animate({
				top: (windowHeight / 2) - 50,
				opacity: 1
			}, 500, function () {
				// trigger a nav click so the active indicator slides over to the active nav item
				activeNavItem.trigger('click');
			});
		});

	},
	navigation: {
		pageCoords: [],
		refreshNavInd: function () {
			var curNavItem, navActiveInd;

			// Fix the nav active indicator
			curNavItem = $('#nav li.active');
			navActiveInd = $('#nav_active_ind');
			navActiveInd.css('left', curNavItem.position().left);
		},
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
			curActiveItem = $('.navItem.active');
			curActiveItem.removeClass('active');		
			// Activate clicked nav item
			thisEl.addClass('active');
			// Get our active indicator and animate it sliding over to the clicked nav item
			navActiveInd = $('#nav_active_ind');
			navActiveInd.animate({left: [x, 'swing']}, 500);
		},
		onMouseWheelScroll: function () {
			var docScrollY, pageCoords, i, curActiveItem, newActiveItem;
			docScrollY = $(document).scrollTop();
			pageCoords = main.navigation.pageCoords
			curActiveItem = $('.navItem.active');
			// Loop through each page coord to see where our document's scroll position is in relation to a page
			for (i = 0; i < pageCoords.length; i++) {
				if (docScrollY >= pageCoords[i][1] && docScrollY < (pageCoords[i][1] + 540)) {
					curActiveItem.removeClass('active');
					newActiveItem = $('#navItem_' + pageCoords[i][0]);
					newActiveItem.addClass('active');
					main.navigation.refreshNavInd();
					break;
				}
			}
		}
	},
	onWindowResize: function () {
		main.navigation.refreshNavInd();
	}
};


$(document).ready(main.init);