var specialImage;
var added = false;
var images = [];
var audio = new Audio('images/woah.aac');
audio.volume = 0.1;

window.onload = function () {
    console.log("loaded");
    console.log("move mouse or tap to play if on mobile");
    document.body.addEventListener("mousemove", function () {
        audio.play()
    });
    document.body.addEventListener("touchmove", function () {
        audio.play()
    });
}


for (let i = 1; i <= 18; i++) {
    let image = document.getElementById("i" + i);
    if (image.complete) {
        load(image, i);
    } else {
        image.addEventListener('load', () => load(image, i));
    }
}

function load(image, index) {
    if (index === 4) {
        specialImage = image;
        return;
    }
    if (images.length === 0) {
        image.style.display = "block";
    }
    images.push(image);
}

if (window.matchMedia("(pointer: coarse)").matches) {
    var currentIndex = 0;
    setInterval(() => {
        if (images.length == 0) {
            return;
        }
        if (!added && specialImage) {
            added = true;
            images.push(specialImage);
        }
        images[currentIndex].style.display = "none";
        currentIndex = (currentIndex + 1) % images.length
        images[currentIndex].style.display = "block";
    }, 247);
} else {
    var lastUpdate = new Date().getTime();
    var lastX = -1, lastY = -1;
    var counterValue = 10;
    var counter = counterValue;
    var currentIndex = 0;
    window.addEventListener('mousemove', (e) => {
        if (images.length == 0) {
            return;
        }
        if (lastX === -1 || lastY === -1) {
            lastX = e.x;
            lastY = e.y;
        }
        let now = new Date().getTime();
        if (now < lastUpdate + 1000 / 60) {
            return;
        }
        let timeDelta = now - lastUpdate;
        let dx = e.x - lastX;
        let dy = e.y - lastY;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let speed = distance / timeDelta;
        lastX = e.x;
        lastY = e.y;
        lastUpdate = now;
        counter -= speed * speed;
        if (counter < 0) {
            if (specialImage) {
                specialImage.style.display = "none";
                if (speed > 4 && Math.random() <= 0.07) {
                    specialImage.style.display = "block";
                }
            }
            counter = counterValue;
            images[currentIndex].style.display = "none";
            currentIndex = (currentIndex + 1) % images.length
            images[currentIndex].style.display = "block";
        }
    });
}