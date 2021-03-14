document.addEventListener("DOMContentLoaded", function() {
	function playSound(e) {
		const sound = document.querySelector(`audio[data-key="${e.keyCode}"]`);
		const pressedKey = document.querySelector(`.key[data-key="${e.keyCode}"]`);
		//sound part
		if(!sound) return;
		sound.currentTime = 0;
		sound.play();
		//graphics part
		pressedKey.classList.add('pressed')
	}

	function removeTransition(e) {
		if(e.propertyName !== 'transform') return;
		this.classList.remove('pressed');
	}
	
	document.addEventListener('keydown', playSound)
	const keys = document.querySelectorAll('.key');
	keys.forEach(key => key.addEventListener('transitionend', removeTransition));

});