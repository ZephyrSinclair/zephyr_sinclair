const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c = canvas.getContext('2d');    // *context*


/*
c.fillStyle = "rgba(255, 0, 0, 0.4)";
c.fillRect(100, 100, 100, 100);
c.fillStyle = "rgba(0, 255, 0, 0.4)";
c.fillRect(200, 200, 100, 100);
c.fillStyle = "rgba(0, 0, 255, 0.4)";
c.fillRect(300, 300, 100, 100);
c.fillStyle = "rgba(255, 125, 0, 0.4)";
c.fillRect(100, 400, 100, 100);
*/

// line

/*
c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.lineTo(400, 300);
c.strokeStyle = "red";
c.stroke();  // stroke method
*/

// Arc // Circle


/*
for (let i = 0; i < 125; i++) {
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    let randomRedValue = Math.floor(Math.random() * 255);
    let randomBlueValue = Math.floor(Math.random() * 255);
    let randomGreenValue = Math.floor(Math.random() * 255);
    let randomAlphaValue = Math.random();
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false);
    c.strokeStyle = `rgba(${randomRedValue}, ${randomGreenValue}, ${randomBlueValue}, ${randomAlphaValue})`;
    c.stroke();
}
*/

/*
c.beginPath();
c.arc(200, 200, 30, 0, Math.PI * 2, false);
c.strokeStyle = 'blue';
c.stroke();
*/

/*

*/
let mouse = {
    x: undefined,
    y: undefined
};

let maxRadius = 25;
let minRadius = 3;

let colorArray = [
    '#33f5ff',  // cyan
    '#00aad0ff',  // bright green
    '#afe3f1ff',  // orange
    '#74acffff',  // blue
    '#3e75c7ff',  // gray-blue
    '#0591f5ff',  // yellow-green
    '#5bb8ffff',  // yellow-green
    '#ffffffff',  // yellow-green
    '#7cf7b5',  // mint green
    '#41f3d2ff',  // red
    '#75f697ff',  // bright red
    '#89eaeaff',  // purple
    '#aff8e4ff',  // orange-red
    '#33ff66',   // bright green
    '#8ef3a7ff'   // bright green
];

// Mouse events for desktop
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

// Touch events for mobile devices
window.addEventListener('touchmove', function(event) {
    event.preventDefault(); // Prevent scrolling
    if (event.touches.length > 0) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
    }
})

// Handle touch start (when finger first touches screen)
window.addEventListener('touchstart', function(event) {
    event.preventDefault();
    if (event.touches.length > 0) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
    }
})

// Reset mouse position when touch ends
window.addEventListener('touchend', function(event) {
    mouse.x = undefined;
    mouse.y = undefined;
})

window.addEventListener('resize', function() {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
})


function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.baseOpacity = Math.random() * 0.3 + 0.6; // Random opacity between 0.6 and 0.9

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        
        // Create depth effect: smaller circles = lower opacity (farther away)
        let depthOpacity = (this.radius / maxRadius) * 0.7 + 0.3; // Scale opacity based on size
        let finalOpacity = this.baseOpacity * depthOpacity;
        
        // Convert hex color to rgba with opacity
        let hexColor = this.color.replace('#', '');
        let r = parseInt(hexColor.substr(0, 2), 16);
        let g = parseInt(hexColor.substr(2, 2), 16);
        let b = parseInt(hexColor.substr(4, 2), 16);
        
        c.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity})`;
        c.fill();
    }
    this.update = function () {
         if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    
    // interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
        if (this.radius < maxRadius) {
            this.radius += 1;
        }
    } else if (this.radius > this.minRadius) {
        this.radius -= 1;
    }

    this.draw();
    };
    }



let circleArray = []

for (i = 0; i < 500; i++) {
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = Math.random() - 0.5 * 2;
    let dy = Math.random() - 0.5 * 2;
   
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

console.log(circleArray)


// let circle = new Circle(200, 200, 6, 5, 30);

function init() {

}

function animate() {
    requestAnimationFrame(animate);
    
    // Light trail effect: instead of solid black, use semi-transparent overlay
    c.fillStyle = 'rgba(0, 0, 0, 0.3)'; // Very subtle fade (0.1 = 10% opacity)
    c.fillRect(0, 0, innerWidth, innerHeight);
    
    for (i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
    
animate();