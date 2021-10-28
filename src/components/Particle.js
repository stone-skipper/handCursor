/*
      Example 5: Generating a load of random particles (with gravity)
    */
window.onload = function () {

    // Initialise an empty canvas and place it on the page
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 380;
    document.body.appendChild(canvas);

    // Inital starting position
    var posX = 20,
        posY = canvas.height / 2;

    // No longer setting velocites as they will be random
    // Set up object to contain particles and set some default values
    var particles = {},
        particleIndex = 0,
        settings = {
            density: 20,
            particleSize: 10,
            startingX: canvas.width / 2,
            startingY: canvas.height / 4,
            gravity: 0.5
        };

    // Set up a function to create multiple particles
    function Particle() {
        // Establish starting positions and velocities
        this.x = settings.startingX;
        this.y = settings.startingY;

        // Determine original X-axis speed based on setting limitation
        this.vx = Math.random() * 20 - 10;
        this.vy = Math.random() * 20 - 5;

        // Add new particle to the index
        // Object used as it's simpler to manage that an array
        particleIndex++;
        particles[particleIndex] = this;
        this.id = particleIndex;
        this.life = 0;
        this.maxLife = 100;
    }

    // Some prototype methods for the particle's "draw" function
    Particle.prototype.draw = function () {
        this.x += this.vx;
        this.y += this.vy;

        // Adjust for gravity
        this.vy += settings.gravity;

        // Age the particle
        this.life++;

        // If Particle is old, it goes in the chamber for renewal
        if (this.life >= this.maxLife) {
            delete particles[this.id];
        }

        // Create the shapes
        context.clearRect(settings.leftWall, settings.groundLevel, canvas.width, canvas.height);
        context.beginPath();
        context.fillStyle = "#ffffff";
        // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
        context.arc(this.x, this.y, settings.particleSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

    }

    setInterval(function () {
        context.fillStyle = "rgba(10,10,10,0.8)";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the particles
        for (var i = 0; i < settings.density; i++) {
            if (Math.random() > 0.97) {
                // Introducing a random chance of creating a particle
                // corresponding to an chance of 1 per second,
                // per "density" value
                new Particle();
            }
        }

        for (var i in particles) {
            particles[i].draw();
        }
    }, 30);
};