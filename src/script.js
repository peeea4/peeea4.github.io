import { usersList } from "./users.js"

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


let btnCompare = document.querySelector(".enter");
btnCompare.addEventListener("click", () => {
	let inputStar = document.querySelector(".star").value;
	searchStar(inputStar);
})

function searchStar(inputStar) {
	for (let index = 1; index < 6; index++) {
		if (usersList[index].nickname == inputStar) {
			createStarCard(usersList[index]);
		}
	}
}
let serverContainer = document.querySelector(".server");
function createStarCard(array) {
	let statContainer = document.createElement("div");
	statContainer.classList.add('stat')
	serverContainer.appendChild(statContainer);
	for (let key in array) {
		switch (key) {
			case "image":
				let statName = document.createElement("img");
				statName.classList.add('user-image');
				statName.src = array[key];
				serverContainer.appendChild(statName);
				break;
			case "age":
				let statAge = document.createElement("p");
				statAge.classList.add('description', 'large');
				statAge.innerHTML = array[key];
				statContainer.appendChild(statAge);
				break;
			case "rating":
				let statRating = document.createElement("p");
				statRating.classList.add('description', 'large');
				statRating.innerHTML = array[key];
				statContainer.appendChild(statRating);
				break;
			case "impact":
				let statImpact = document.createElement("p");
				statImpact.classList.add('description', 'large');
				statImpact.innerHTML = array[key];
				statContainer.appendChild(statImpact);
				break;
			case "dpr":
				let statDpr = document.createElement("p");
				statDpr.classList.add('description', 'large');
				statDpr.innerHTML = array[key];
				statContainer.appendChild(statDpr);
				break;
			case "apr":
				let statApr = document.createElement("p");
				statApr.classList.add('description', 'large');
				statApr.innerHTML = array[key];
				statContainer.appendChild(statApr);
				break;
			case "kast":
				let statKast = document.createElement("p");
				statKast.classList.add('description', 'large');
				statKast.innerHTML = array[key];
				statContainer.appendChild(statKast);
				break;
			case "kpr":
				let statKpr = document.createElement("p");
				statKpr.classList.add('description', 'large');
				statKpr.innerHTML = array[key];
				statContainer.appendChild(statKpr);
				break;
			case "headshots":
				let statHeadshots = document.createElement("p");
				statHeadshots.classList.add('description', 'large');
				statHeadshots.innerHTML = array[key];
				statContainer.appendChild(statHeadshots);
				break;
			case "mapsPlayed":
				let statMapsPlayed = document.createElement("p");
				statMapsPlayed.classList.add('description', 'large');
				statMapsPlayed.innerHTML = array[key];
				statContainer.appendChild(statMapsPlayed);
				break;

		}
		// console.log(key, array[key]);
	}
}
// создаём элементы с именами - key и блоки со значениями - ${array[key]}



// function createCard() {
//     let cardContainer = document.querySelector(".compare-saved");
// }
