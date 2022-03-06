const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const cancelButton = document.querySelector(".cancel");
const signInUpButton = document.querySelector(".signInUp")

const container = document.getElementById('container-pop');
const containerPopUp = document.querySelector(".pop-up");

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

cancelButton.addEventListener("click", () => {
    containerPopUp.style.display = "none";
})

signInUpButton.addEventListener("click", () => {
    containerPopUp.style.display = "flex";
})