(function() {
	var wrap = $(window);
	var container = $('body');
	var nav = ['about', 'products', 'team', 'contact'];
	var navTop = [];
	var scroll = 0;
	var calcPosition = () => {
		navTop = [];
		nav.forEach((el) => {
			var e = document.getElementById(el);
			var m = e.getBoundingClientRect();
			navTop.push(m.top - 120);
		});
	};
	$('nav ul li a').click((evt) => {
		var link = $(evt.currentTarget);
		// $('nav ul li a.active').removeClass('active');
		// link.addClass('active');
		var elm = document.getElementById(link.data('to'));
		var move = elm.getBoundingClientRect();
		scroll = container.scrollTop() + move.top - 30;
		container.animate({
			scrollTop: scroll
		}, 500);
	});
	$(document).ready(() => {
		calcPosition();
	});
	$(window).on('load', () => {
		calcPosition();
	});
	$(window).resize(() => {
		calcPosition();
	});
	$(window).scroll(() => {
		var elm = document.getElementById('main');
		var move = elm.getBoundingClientRect();
		if (move.top < 0) {
			$('nav').addClass("fixed");
		} else {
			$('nav').removeClass("fixed");
		}
		var active = '';
		navTop.forEach((el, index) => {
			if (index === navTop.length - 1) {
				if ($(window).scrollTop() >= navTop[index]) {
					active = nav[index];
				}
			} else {
				if ($(window).scrollTop() >= navTop[index] && $(window).scrollTop() < navTop[index + 1]) {
					active = nav[index];
				}
			}
		});
		$('nav ul li a.active').removeClass('active');
		$('ul').find('[data-to="' + active + '"]').addClass('active');
	});
})();