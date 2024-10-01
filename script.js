let state = 2; // Initial state is 2, meaning the red light is active
let speed = 0; // Current speed of the car
const maxSpeed = 20; // Maximum speed of the car
const acceleration = 2; // Speed increment when the light is green
const car = document.getElementById('car'); // Get the car element

function changeLight() {
    // Reset all lights to inactive
    document.querySelector('.red').classList.remove('active');
    document.querySelector('.yellow').classList.remove('active');
    document.querySelector('.green').classList.remove('active');

    document.querySelector('.red').classList.add('inactive');
    document.querySelector('.yellow').classList.add('inactive');
    document.querySelector('.green').classList.add('inactive');

    // Increment state and wrap around using modulo
    state = (state + 1) % 4;

    // Set the traffic lights based on the state
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

    if (greenLightActive) {
        speed = Math.min(speed + acceleration, maxSpeed);
    } else if (yellowLightActive) {
        speed = Math.max(speed - acceleration, 0);
    } else if (redLightActive) {
        speed = 0;
    }

    let currentTop = parseFloat(getComputedStyle(car).top) || 100;
    car.style.top = `${currentTop - speed / 5}px`;
}

document.addEventListener('DOMContentLoaded', () => {
    // Manually activate the red light without calling changeLight()
    document.querySelector('.red').classList.add('active');
    document.querySelector('.red').classList.remove('inactive');
    // Ensure no other lights are active at the start
    document.querySelector('.yellow').classList.remove('active');
    document.querySelector('.green').classList.remove('active');
    document.querySelector('.green').classList.add('inactive');
});

// Start changing lights and controlling the car
setInterval(controlCar, 100);
