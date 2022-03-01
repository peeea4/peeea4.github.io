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
    if(element.classList.contains("try")) {
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
        if(usersList[index].nickname == inputStar) {
            createStarCard(usersList[index]);
        }
    }
}
let x = document.querySelector(".user");
function createStarCard(array) {
    for (let key in array) {
        switch(key){
            case "image":
                let statName = document.createElement("img");
                statName.classList.add('user-image');
                console.log("hi");
                statName.src = array[key];
                x.appendChild(statName);
                break;
            case "id":
                console.log(`Look at this ID: ${array[key]}`);
                break;
            case "id":
                console.log(`Look at this ID: ${array[key]}`);
                break;
            case "id":
                console.log(`Look at this ID: ${array[key]}`);
                break;
            case "id":
                console.log(`Look at this ID: ${array[key]}`);
                break;

        }
        // console.log(key, array[key]);
    }
}
// создаём элементы с именами - key и блоки со значениями - ${array[key]}



// function createCard() {
//     let cardContainer = document.querySelector(".compare-saved");
// }
