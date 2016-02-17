var ctx = document.querySelector("canvas").getContext("2d");
var WIDTH = 800;
var HEIGHT = 800;
var G = 1;
var dt = 1;
var particles = [];
var partnum = 0;
function gacc(x1, y1, x2, y2, M) {
    var delx = x2-x1;
    var dely = y2-y1;
    var absdel = Math.pow(Math.pow(delx,2)+Math.pow(dely,2),0.5);
    var k = G*M/Math.pow(absdel,3);
    return [k*delx, k*dely];
}

function particle(rx, ry, vx, vy, ax, ay, mass, fixed, color) {
    this.rx = rx;
    this.ry = ry;
    this.vx = vx;
    this.vy = vy;
    this.ax = ax;
    this.ay = ay;
    this.mass = mass;
    this.fixed = fixed;
    this.color = color;
    this.radius = Math.pow(mass, 0.33);
    this.id = partnum;
    partnum +=1;
    particles.push(this);
}

particle.prototype = {
    update: function () {
        "use strict";
        var tmpax = 0, tmpay = 0;
        for (var i = 0; i < partnum ; i++) {
            if (this.id!=i) { 
                var thisgacc = gacc(this.rx, this.ry, particles[i].rx, particles[i].ry, particles[i].mass)
                tmpax += thisgacc[0];
                tmpay += thisgacc[1];
            }
        }
        this.ax = tmpax;
        this.ay = tmpay;
        this.vx += this.ax;
        this.vy += this.ay;
        this.rx += this.vx;
        this.ry += this.vy;
    },
    draw: function() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.rx, this.ry, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
};

function dostuff()
{
function drawall() {
    ctx.fillStyle = "rgba(255,255,255,.3)"
    ctx.fillRect(0,0,WIDTH,HEIGHT)
    // drawtmp
    // drawallballs
    for (var i = 0; i < partnum; i++) {
        if (particles[i].fixed == false){
            particles[i].update();
        }
        particles[i].draw();
    }
    requestAnimationFrame(drawall);
}

var mypart = new particle(150, 60, 3, 0, 0, 0, 10, false, "green");
var mypart2 = new particle(150, 160, 0, 0, 0, 0, 1000, false, "red");
drawall();
}