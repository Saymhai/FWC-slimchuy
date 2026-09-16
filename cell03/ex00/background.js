const button = document.getElementById('btn')

function changeBackground() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    const randomColor = `rgb(${r}, ${g}, ${b})`;

    return randomColor
}

button.addEventListener('click', () => {
    document.body.style.backgroundColor = changeBackground();
});