/***************** Bubble animations *****************/

function makeBubble( where ){
	// This initial condition gives us a bailout if we ever want to stop the celebration. Setting it to true will stop it. I'm not sure about the current implementation, though.
	if ( celebrate.stopCelebrating ) {
		return;
	}
	
	// Helper function to get random numbers.
	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	// Define all variables.
	var newBubble, diameter, alphaChannel, color, cssString, animationId, posLeft, posBottom, animDelay;
	// Define the diameter of the bubble.
	diameter = getRandomInt(10, 25);
	// Define the color. First we get the alpha channel and then create the rgba value. Rgba is used instead of solid colors so that we can create a nice overlapping effect without touching opacity. Opacity is in fact used in the animation for bursting the bubble.
	alphaChannel = getRandomInt(3, 8) / 10;
	color = '255, 130, 76, ' + alphaChannel;
	// Define the position bottom and left.
	posLeft = getRandomInt(0, 100);
	posBottom = getRandomInt(-25, 50);
	// Define an optional animation delay.
	animDelay = getRandomInt(0, 3) * 100;
	// Create the css string to be added to the element.
	cssString = 'width:'+ diameter +'px;' +
		'height:'+ diameter +'px;' +
		'bottom:'+ posBottom +'%;' +
		'left:'+ posLeft +'%;' +
		'background-color:rgba('+ color +');' +
		'-webkit-animation-delay:'+ animDelay +'ms;' +
		'animation-delay:'+ animDelay +'ms;';
	// Decide what animation to apply.
	animationId = getRandomInt(1,3);
	// Create the thing.
	newBubble = document.createElement('span');
	// Apply classes and styles.
	newBubble.classList.add('bubble', 'bubble-burst-'+ animationId);
	newBubble.style.cssText +=';'+ cssString;
	
	// Append it where you're told to.
	where.appendChild(newBubble);
	
	// We need to calculate how much time will the animation last (delay + duration). The duration needs to be in milliseconds, hence the * 1000.
	function getAnimationDuration( el ) {
		var elStyle = getComputedStyle(el);
		var animDuration = elStyle.getPropertyValue('animation-duration') || 
				elStyle.getPropertyValue('-webkit-animation-duration');
			animDuration = parseFloat(animDuration) * 1000;
			animDelay = elStyle.getPropertyValue('animation-delay') || 
					elStyle.getPropertyValue('-webkit-animation-delay');
				animDelay = parseFloat(animDelay) * 1000;
		return animDuration + animDelay;
	}
	
	// We then wait for the animation to end, and then we remove the element and fire the main function all over again.
	setTimeout(function () {
		newBubble.parentNode.removeChild(newBubble);
		makeBubble(where);
	}, getAnimationDuration(newBubble));
}

// This is the function that will actually fire the bubbles. It accepts a DOMNode where the bubbles should appear and the quantity of bubbles to create.
function celebrate(place, quantity) {
	// We make sure that stopCelebrating is set to false.
	celebrate.stopCelebrating = false;
	for (var i = 0; i < quantity; i++) {
		makeBubble(place);
	}
}

function stopCelebration() {
	celebrate.stopCelebrating = true;
}

window.addEventListener('load', function() {
	
	// Set a place where we want this thing to fire.
	var place = document.querySelector('.bubble-animation');
	
	// Fire the thing!	
	celebrate(place, 10);
	
});

