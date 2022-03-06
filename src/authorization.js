const buttonAuthorize = document.querySelector(".signInBtn");
const cancelBtn = document.querySelector(".cancel");
let emailInput;
let passwordInput;
let userId;
let password = "12345678";
let buttonSignContainer = document.querySelector(".sign");
let image;

buttonAuthorize.addEventListener("click", () => {
    passwordInput = document.querySelector(".passInp").value;
    emailInput = document.querySelector(".emailInp").value;
    if(passwordInput == password) {
        userId = emailInput;
        getUserData(userId);
        closePopUp();
    }
})

function closePopUp() {
    cancelBtn.click()
}

let createUserObj = function(dataS) {
    let imgMedium = dataS.profile.avatarmedium;
    console.log(dataS, imgMedium);
    image = imgMedium;
    showProfileIcon(imgMedium);
}

function showProfileIcon(profileSrc) {
    buttonSignContainer.firstElementChild.innerHTML = "Выйти";
    buttonSignContainer.lastElementChild.innerHTML = `<img src=${profileSrc} alt="">`;
}

function getUserData(userId) {
    fetch(`https://api.opendota.com/api/players/${userId}`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        createUserObj(data);
    })
}

function createUserProfile() {

}
