function splitLines(container, opentag, closingtag) {
	var spans = container.children,
		top = 0,
		tmp = '';
	container.innerHTML = container.textContent.replace(/\S+/g, '<n>$&</n>');
	let count = 0;
	let tempopentag = opentag;
	for (let i = 0; i < spans.length; i++) {
		var rect = spans[i].getBoundingClientRect().top;
		if (top < rect) {
			count++;
			delay = 150 + (count * 50);
			opentag = opentag.replace('data-jazzy-scroll-delay', `style="transition-delay:${delay}ms"`);
			tmp += closingtag + opentag;
			opentag = tempopentag;
		}
		top = rect;
		tmp += spans[i].textContent + ' ';
	}
	container.innerHTML = tmp += closingtag;
}
if ($('.hero').length > 0) {
	splitLines($('.hero h1')[0], '<span class="overflow-none"><span data-jazzy-scroll="slide-up" data-jazzy-scroll-delay>', '</span></span>')
}
for (var i = 0; i < $('h2').length; i++) {
	splitLines($('h2')[i], '<span class="overflow-none"><span data-jazzy-scroll="slide-up" data-jazzy-scroll-delay>', '</span></span>')
}
for (var i = 0; i < $('.features h3').length; i++) {
	splitLines($('.features h3')[i], '<span class="overflow-none"><span data-jazzy-scroll-child="slide-up" data-jazzy-scroll-delay>', '</span></span>')
}
jQuery(document).ready(function() {
	$('.reviews').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		adaptiveHeight: true,
		variableWidth: true,
		prevArrow: '.prev',
		nextArrow: '.next',
		infinite: false,
	});

	function scrollHelper() {
		let scrollTop = $(window).scrollTop();
		if (scrollTop > 0) {
			$('header').addClass('super-sticky');
		} else {
			$('header').removeClass('super-sticky');
		}
	}
	$(window).scroll(function() {
		scrollHelper();
	});
	scrollHelper();
	let useJazzyAnimations = window.matchMedia('(prefers-reduced-motion: no-preference)');
	if (useJazzyAnimations.matches) {
		$.fn.isInViewport = function(offset = 0) {
			offset = parseInt(offset);
			let elementTop = $(this).offset().top;
			let elementBottom = elementTop + $(this).outerHeight();
			let viewportTop = $(window).scrollTop();
			let viewportBottom = viewportTop + $(window).height();
			return elementTop + offset < viewportBottom;
		}
		class JazzyScroll {
			constructor(settings) {
				this.delay = settings.delay;
				this.speed = settings.speed;
				this.offset = settings.offset;
				this.initScroll();
			}
			initScroll() {
				let init_delay = this.delay;
				let init_offset = this.offset;
				let init_speed = this.speed;
				let delay;
				let offset;
				let speed;
				$('[data-jazzy-scroll]').each(function() {
					let $element = $(this);
					delay = $element.attr('data-jazzy-scroll-delay') ? $element.attr('data-jazzy-scroll-delay') : init_delay;
					offset = $element.attr('data-jazzy-scroll-offset') ? $element.attr('data-jazzy-scroll-offset') : init_offset;
					speed = $element.attr('data-jazzy-scroll-speed') ? $element.attr('data-jazzy-scroll-speed') : init_speed;
					$element.css('transition-duration', `${speed}ms`);
					if ($element.isInViewport(offset)) {
						setTimeout(() => {
							$element.addClass('animated-in');
						}, delay);
					}
				});
			}
		}
		let jazzyScroll = new JazzyScroll({
			'delay': 0,
			'speed': 600,
			'offset': 0
		});
		$(window).on('resize scroll load', function() {
			if (typeof window.orientation !== 'undefined') {
				jazzyScroll.offset = 0;
			}
			jazzyScroll.initScroll();
		})
	}
	var menu = $('.mobile-menu');
	var header = $('header');

	function mobileFiltering() {
		menu.click(function(e) {
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
			var status = header.hasClass('active');
			if (status) {
				header.removeClass('active');
				$('html').removeClass('active');
			} else {
				header.addClass('active');
				$('html').addClass('active');
			}
		});
	}

	function endMobile() {
		menu.unbind();
		header.removeClass('active');
		$('html').removeClass('active');
	}
	var tabletbreakpoint = 1101;
	if ($(window).width() < tabletbreakpoint) {
		mobileFiltering();
	} else {
		endMobile();
	}
	$(window).resize(function() {
		if ($(window).width() < tabletbreakpoint) {
			mobileFiltering();
		} else {
			endMobile();
		}
	});
	$('.feature-list .switch').click(function() {
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
		} else {
			$(this).parent().addClass('active');
		}
	});
});
$.get('/resources/script/servers.txt', function(data) {
	$('.statistics ul li:nth-of-type(1) h4').html(data);
});
$.get('/resources/script/users.txt', function(data) {
	$('.statistics ul li:nth-of-type(3) h4').html(data);
});
$.get('', function(data) {
	$('.statistics ul li:nth-of-type(2) h4').html(data);
});

