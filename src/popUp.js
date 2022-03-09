const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const signInUpButton = document.querySelector(".signInUp")
const cancelButton = document.querySelector(".cancel");
const tryButtonList = Array.from(document.querySelectorAll(".try"));

const container = document.getElementById('container-pop');
const containerPopUp = document.querySelector(".pop-up");

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

signInUpButton.addEventListener("click", showPopUp);

tryButtonList.forEach( element => {
    element.addEventListener("click", showPopUp);
});

cancelButton.addEventListener("click", () => {
    containerPopUp.style.display = "none";
})

function showPopUp() {
    containerPopUp.style.display = "flex";
}
