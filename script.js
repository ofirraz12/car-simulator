let state = 2;
let speed = 0; 
const maxSpeed = 20;
const acceleration = 2;
const car = document.getElementById('car');
const stopLine = document.querySelector('.stop-line');
let carStopped = false;

function changeLight() {
    document.querySelector('.red').classList.remove('active');
    document.querySelector('.yellow').classList.remove('active');
    document.querySelector('.green').classList.remove('active');

    document.querySelector('.red').classList.add('inactive');
    document.querySelector('.yellow').classList.add('inactive');
    document.querySelector('.green').classList.add('inactive');

    state = (state + 1) % 4;

    if (state === 0) {
        document.querySelector('.green').classList.add('active');
        document.querySelector('.green').classList.remove('inactive');
    } else if (state === 1) {
        document.querySelector('.yellow').classList.add('active');
        document.querySelector('.yellow').classList.remove('inactive');
    } else if (state === 2) {
        document.querySelector('.red').classList.add('active');
        document.querySelector('.red').classList.remove('inactive');
    } else if (state === 3) {
        document.querySelector('.red').classList.add('active');
        document.querySelector('.yellow').classList.add('active');
        document.querySelector('.red').classList.remove('inactive');
        document.querySelector('.yellow').classList.remove('inactive');
    }
}

function controlCar() {
    const greenLightActive = document.querySelector('.green').classList.contains('active');
    const yellowLightActive = document.querySelector('.yellow').classList.contains('active');
    const redLightActive = document.querySelector('.red').classList.contains('active');

    let currentTop = parseFloat(getComputedStyle(car).top) || 400;
    const stopLineTop = parseFloat(getComputedStyle(stopLine).top);
    const distanceToStopLine = currentTop - stopLineTop;

    if (distanceToStopLine > 0) {
        if (greenLightActive) {
            speed = Math.min(speed + acceleration, maxSpeed);
        } else if (yellowLightActive) {
            speed = Math.max(distanceToStopLine / 10, 0);
        } else if (redLightActive) {
            speed = Math.max(distanceToStopLine / 20, 0);
        }
    } else {
        carStopped = true;
        speed = Math.min(speed + acceleration, maxSpeed);
    }

    if (currentTop - speed <= 0) {
        car.style.top = '90vh';
        speed = 0;
    } else {
        car.style.top = `${currentTop - speed}px`;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.red').classList.add('active');
    document.querySelector('.red').classList.remove('inactive');
    document.querySelector('.yellow').classList.remove('active');
    document.querySelector('.green').classList.remove('active');
    document.querySelector('.green').classList.add('inactive');
});

setInterval(controlCar, 100);
