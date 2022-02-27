let btns = Array.from(document.querySelectorAll(".show-text"));
btns.forEach(element => {
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

let btnsTry = Array.from(document.querySelectorAll(".btn"));
btnsTry.forEach(element => {
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
