const images = [];
const audio = new Audio('images/closer2.aac');
audio.volume = 0.1;

function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

window.onload = () => {
    console.log('loaded');
    console.log('move mouse or tap to play if on mobile');

    console.log(isSafari() ? 'rich' : 'no starbucks for you');

    document.body.addEventListener('click', () => audio.play());
    document.body.addEventListener('touchstart', () => audio.play());
};

for (let i = 1; i <= 18; i++) {
    const image = document.getElementById(`i${i}`);
    image.complete ? load(image, i) : image.addEventListener('load', () => load(image, i));
}

function load(image, index) {
    if (index === 4) return;
    images.push(image);
    if (images.length === 1) image.style.display = 'block';
}

if (window.matchMedia('(pointer: coarse)').matches) {
    let currentIndex = 0;
    setInterval(() => {
        if (images.length === 0) return;
        images[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].style.display = 'block';
    }, 343);
} else {
    let lastUpdate = Date.now();
    let lastX = -1;
    let lastY = -1;
    let counterValue = 10;
    let counter = counterValue;
    let currentIndex = 0;

    window.addEventListener('mousemove', event => {
        if (images.length === 0) return;
        if (lastX === -1 || lastY === -1) {
            lastX = event.x;
            lastY = event.y;
        }
        const now = Date.now();
        if (now < lastUpdate + 1000 / 60) return;
        const timeDelta = now - lastUpdate;
        const dx = event.x - lastX;
        const dy = event.y - lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = distance / timeDelta;
        lastX = event.x;
        lastY = event.y;
        lastUpdate = now;
        counter -= speed * speed;
        if (counter < 0) {
            counter = counterValue;
            images[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].style.display = 'block';
        }
    });
}
