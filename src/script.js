let btns = Array.from(document.querySelectorAll(".show-text"));
btns.forEach(element => {
    element.addEventListener("click", function() {
        element.classList.toggle("active");
        let panel = element.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
});