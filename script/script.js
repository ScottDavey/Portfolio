
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

		// Handle the scroll event (to update active indicator when scroll to a page)
		theWindow.on('scroll', main.navigation.onPageScroll);

		// Begin intro animation
		main.intro(activeNavItem);
	},
	intro: function (activeNavItem) {
		var introImg, introOveraly, introTitle, windowHeight;
		introImg = $('<img />').attr('src', 'images/Background_Fog_Warm.jpg');
		introOveraly = $('#intro_overlay');
		introTitle = $('#intro_title');
		windowHeight = $(window).height();

		// Once the intro image is loaded, set it as the div's background image, then proceed with animation
		introImg.on('load', function () {
			var introDiv;
			introDiv = $('#intro');
			introDiv.css({ 'background-image': 'url(' + introImg.attr('src') + ')', 'background-repeat': ' no-repeat', 'background-size': '1920px' });
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
		});
	},
	navigation: {
		pageCoords: [],
		isAutoScroll: false,
		currentActive: {
			nav: {
				name: 'intro',
				posX: 0
			},
			page: {
				el: {},
				offsetY: 0,
				ignoreOverlay: true
			},
			set: function (name) {
				var navName, navItem;
				navName = (typeof name !== 'undefined') ? name : main.navigation.currentActive.nav.name;
				navItem = $('#navItem_' + navName);

				main.navigation.currentActive.nav.name = navName;
				main.navigation.currentActive.nav.posX = navItem.position().left;
				main.navigation.currentActive.page.el = $('#' + navName);
				main.navigation.currentActive.page.offsetY = main.navigation.currentActive.page.el.offset().top;
				main.navigation.currentActive.page.ignoreOverlay = navItem.hasClass('ignore_overlay');
			}
		},
		refresh: function () {
			var curNavItem, navActiveInd;

			// Fix the nav active indicator
			main.navigation.currentActive.nav.posX = $('#navItem_' + main.navigation.currentActive.nav.name).position().left;
			navActiveInd = $('#nav_active_ind');
			navActiveInd.css('left', main.navigation.currentActive.nav.posX);
		},
		onNavClick: function () {
			var thisEl, x, curActiveItem, navActiveInd, targetDiv;
			thisEl = $(this);
			pageName = thisEl.html().toLowerCase();

			main.navigation.currentActive.set(pageName);

			// SMOOTH PAGE SCROLL
			$('html, body').animate({
				scrollTop: Math.abs(main.navigation.currentActive.page.offsetY)
			}, 500, main.navigation.activePageAnimation);

			// Get our active indicator and animate it sliding over to the clicked nav item
			navActiveInd = $('#nav_active_ind');
			main.navigation.isAutoScroll = true;
			navActiveInd.animate({left: main.navigation.currentActive.nav.posX}, 500, function () { main.navigation.isAutoScroll = false; });
		},
		activePageAnimation: function () {
			var activeNavItemText, activePagePosY, whiteOverlay;
			whiteOverlay = $('#white_overlay');
			whiteOverlay.hide();
			if (!main.navigation.currentActive.page.ignoreOverlay) {
				whiteOverlay.css('top', main.navigation.currentActive.page.offsetY);
				whiteOverlay.fadeIn(400);
			}
		},
		onPageScroll: function () {
			var docScrollY, pageCoords, i, newActiveItem;
			if (!main.navigation.isAutoScroll) {
				docScrollY = $(document).scrollTop();
				pageCoords = main.navigation.pageCoords;
				// Loop through each page coord to see where our document's scroll position is in relation to a page
				for (i = 0; i < pageCoords.length; i++) {
					if (docScrollY >= (pageCoords[i][1] - 100) && docScrollY < (pageCoords[i][1] + 540)) {
						if (main.navigation.currentActive.nav.name !== pageCoords[i][0]) {
							main.navigation.currentActive.set(pageCoords[i][0]);
							main.navigation.refresh();
							main.navigation.activePageAnimation();
							break;
						}
					}
				}
			}
		}
	},
	onWindowResize: function () {
		main.navigation.refresh();
	}
};


$(document).ready(main.init);