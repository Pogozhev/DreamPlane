import './sass/app.scss'
import chat from './chat'
import Slideout from 'slideout';

// Elements
var W = window,
	D = document,
	A = D.getElementById('app'),
	C = D.getElementById('content'),
	chatEl = document.getElementById('chatbox'),
	friendsEl = document.getElementById('friends'),
	navEl = document.getElementById('nav'),
	toggleFriends = D.getElementById('toggle-friends'),
	toggleNav = D.getElementById('toggle-nav');

// Toggle navigation
var slideTolerance = 70,
	slideDuration = 500,
	slidePadding = Math.min(C.offsetWidth, 400),
	slideFriends = new Slideout({
	    'panel': C,
	    'menu': friendsEl,
	    'padding': slidePadding,
	    'tolerance': slideTolerance,
	    'duration': slideDuration
	}),
	slideNav = new Slideout({
	    'panel': C,
	    'menu': navEl,
	    'padding':slidePadding,
	    'tolerance': slideTolerance,
	    'side': 'right',
	    'duration': slideDuration
	}),
	slideInProgress = false,
	slides = [slideFriends, slideNav];

function doSlide(slide) {
	var clone = slides.slice(),
		el = clone.splice(clone.indexOf(slide), 1)[0].menu,
		altSlide = clone[0],
		altEl = clone[0].menu,
		openSlide = function(){
			el.style.display = 'block';
			altEl.style.display = 'none';
			slide.toggle();
		};

	if(altSlide.isOpen()) {
		altSlide.close();
		setTimeout(openSlide, slideDuration*1.1);
	} else {	
		openSlide();
	}
}

toggleFriends.onclick = function(){
	doSlide(slideFriends);
};

toggleNav.onclick = function(){
	doSlide(slideNav);
};
