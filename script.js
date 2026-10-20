
let slides = [];
let current = 0;

let editor = document.getElementById("editor");
let slide = document.getElementById("slide");
let count = document.getElementById("count");


editor.value = localStorage.getItem("slides") ||
`# My First Slide

Welcome to SlideCraft.

---

# My Second Slide

This is my second slide.`;


function updateSlides() {
    slides = editor.value.split("---");
    current = Math.min(current, slides.length - 1);
    showSlide();
}


function showSlide() {
    slide.innerHTML = marked.parse(slides[current]);
    count.innerText = (current + 1) + " / " + slides.length;

    document.querySelectorAll(".container button").forEach(button => {
        if (button.innerText === "Left") {
            button.disabled = current === 0;
        }

        if (button.innerText === "Right") {
            button.disabled = current === slides.length - 1;
        }
    });
}


function previous() {
    if (current > 0) {
        current--;
        showSlide();
    }
}

function next() {
    if (current < slides.length - 1) {
        current++;
        showSlide();
    }
}


function saveSlides() {
    localStorage.setItem("slides", editor.value);
    alert("Slides Saved!");
}

function newSlides() {
    editor.value = "# New Slide\n\nWrite here.";
    current = 0;
    updateSlides();
}


function fullScreen() {
    if (!document.fullscreenElement) {
        slide.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}


function present() {
    slide.requestFullscreen();
}


document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") previous();
    if (event.key === "ArrowRight") next();

    if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        saveSlides();
    }
});


updateSlides();
