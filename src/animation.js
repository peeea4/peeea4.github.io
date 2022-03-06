anime({
	targets: '.morphing-demo .polymorph',
	points: [
		{ value: [
			'70 24 119.574 60.369 100.145 117.631 50.855 101.631 3.426 54.369',
			'70 41 118.574 59.369 111.145 132.631 60.855 84.631 20.426 60.369']
		},
		{ value: '70 6 119.574 60.369 100.145 117.631 39.855 117.631 55.426 68.369' },
		{ value: '70 57 136.574 54.369 89.145 100.631 28.855 132.631 38.426 64.369' },
		{ value: '70 24 119.574 60.369 100.145 117.631 50.855 101.631 3.426 54.369' }
	],
	easing: 'easeOutQuad',
	duration: 2300,
	loop: true
});

let btnsShow = Array.from(document.querySelectorAll(".show-text"));
btnsShow.forEach(element => {
	element.addEventListener("click", () => {
		element.classList.toggle("active");
		let panel = element.nextElementSibling;
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
		} else {
			panel.style.maxHeight = panel.scrollHeight + "px";
		}
	});
});

let btnsNavigate = Array.from(document.querySelectorAll(".btn"));
btnsNavigate.forEach(element => {
	if (element.classList.contains("try")) {
		element.addEventListener("click", () => {
			document.location.href = "/index.html#compare"
		})
	} else if (element.classList.contains("example")) {
		element.addEventListener("click", () => {
			document.location.href = "/index.html#tutorial"
		})
	}
})